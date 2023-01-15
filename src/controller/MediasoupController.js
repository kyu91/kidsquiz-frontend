import {io} from "socket.io-client";
import socket from "../liveComponents/socketExport"
import * as mediasoupClient from 'mediasoup-client';
console.log("미디어숲 socket", socket)
// const socket = io.connect("http://localhost:4000")

//익스포트 함수 
export const getSocket= ()=> {
    return socket
}
export const getSocketName = () => {
    const guestName = localStorage.getItem('guestName');
    return guestName ? guestName : "선생"
}

const MediasoupController = (producerId) => {
    let device
    let rtpCapabilities
    let producerTransport
    let consumerTransports = []
    let audioProducer
    let videoProducer

    let guestRoducerId = []

    const guestName = localStorage.getItem('guestName');
    const roomName = localStorage.getItem('roomName');

    let params = {
    // mediasoup params
    encodings: [
        {
        rid: 'r0',
        maxBitrate: 100000,
        scalabilityMode: 'S1T3',
        },
        {
        rid: 'r1',
        maxBitrate: 300000,
        scalabilityMode: 'S1T3',
        },
        {
        rid: 'r2',
        maxBitrate: 900000,
        scalabilityMode: 'S1T3',
        },
    ],
    codecOptions: {
        videoGoogleStartBitrate: 1000
    }
    }

    
    const initCall = async () => {
        const videoContainer = document.getElementById("videoContainer"); 
        
        //! 1.가장 먼저 실행되는 함수 ( io()로 서버에 소켓 연결이 되면 서버의 emit에 의해 가장 먼저 호출된다. )
        socket.on('connection-success', ({ socketId }) => {
            getLocalStream();
        });
        
        // //! 2. 1번에서 호출되어 두번째로 실행되는 함수 
        const getLocalStream = () => {
            
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: {
                        min: 640,
                        max: 1920,
                    },
                    height: {
                        min: 400,
                        max: 1080,
                    }
                }
            })
            .then(streamSuccess)
            .catch(error => {
                console.log(error.message)
            })
        }
        
        let audioParams;
        let videoParams = { params };
        let consumingTransports = [];
        
        let myStream;
        // 성공적으로 미디어를 가져온 경우에 실행됨 
        //!3. 2번에서 성공적으로 미디어를 가져오면 실행되는 함수 
        const streamSuccess = (stream) => {
            //id가 localVideo인 태그를 가져온다.
            const localVideo = document.getElementById('localVideo');//추가한거
            localVideo.srcObject = stream
            myStream = stream;
            //! ... 문법은 audioParams, videoParams의 주소가 아닌 '값'만 가져온다는 의미! 
            audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
            videoParams = { track: stream.getVideoTracks()[0], ...videoParams };
            
            joinRoom();
        }
        
        //! 4. 3번에서 유저 미디어를 잘 받아서 비디오로 송출한 후에 호출되는 함수. 이 함수를 통해 실제 room에 조인하게 된다.  
        const joinRoom = () => {
            console.log('99999guestName9999',guestName)
            socket.emit('joinRoom', roomName, guestName , (data) => {
                console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)
                // we assign to local variable and will be used when loading the client Device (see createDevice above)
                rtpCapabilities = data.rtpCapabilities
                // once we have rtpCapabilities from the Router, create Device
                createDevice()
            })
        }
        
    // }
    //! 5. 4번에서 room에 조인하고 router rtpCapabilities를 받아온 후 실행되는 함수. Device 객체를 생성한다. 
    const createDevice = async () => {
        try {
            device = new mediasoupClient.Device()
            
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
        // Loads the device with RTP capabilities of the Router (server side)
        await device.load({
            // see getRtpCapabilities() below
            routerRtpCapabilities: rtpCapabilities
        })
    
        console.log('Device RTP Capabilities', device.rtpCapabilities)
    
        // once the device loads, create transport
        createSendTransport()
    
        } catch (error) {
        console.log(error)
        if (error.name === 'UnsupportedError')
            console.warn('browser not supported')
        }
    }

    //! 6. 5번에서 Device 객체를 생성하고나서 호출되느 함수. 비디오를 송출하기 위해 클라이언트 측 SEND Transport 를 생성한다. 
    const createSendTransport = () => {
        // see server's socket.on('createWebRtcTransport', sender?, ...)
        // this is a call from Producer, so sender = true
        //! 방에 조인할 때는 아직 다른 producer가 있는지 모르는 상태 -> 우선은 consumer를 false로 한다. 
        //! 방에 다른 참여자(producer)가 있다면 그때서야 recv transport를 생성하고 그때  consumer:true가 된다. 
        //! 그 작업은 signalNewConsumerTransport 에서 하게 됨 :-) 
        socket.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
        // The server sends back params needed 
        // to create Send Transport on the client side
        if (params.error) {
            console.log(params.error)
            return
        }
    
        // console.log(params)
    
        // creates a new WebRTC Transport to send media
        // based on the server's producer transport params
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions
        producerTransport = device.createSendTransport(params)
    
        // https://mediasoup.org/documentation/v3/communication-between-client-and-server/#producing-media
        // this event is raised when a first call to transport.produce() is made
        // see connectSendTransport() below
        producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
            // Signal local DTLS parameters to the server side transport
            // see server's socket.on('transport-connect', ...)
            await socket.emit('transport-connect', {
                dtlsParameters,
            })
    
            // Tell the transport that parameters were transmitted.
            //! transport에 parameters들이 전송되었다는 것을 알려주는 역할! 
            callback()
    
            } catch (error) {
            errback(error)
            }
        })
    
        producerTransport.on('produce', async (parameters, callback, errback) => {
            // console.log(parameters)
    
            try {
            // tell the server to create a Producer
            // with the following parameters and produce
            // and expect back a server side producer id
            // see server's socket.on('transport-produce', ...)
            await socket.emit('transport-produce', {
                kind: parameters.kind,
                rtpParameters: parameters.rtpParameters,
                appData: parameters.appData,
            }, ({ id, producersExist }) => {
                // Tell the transport that parameters were transmitted and provide it with the
                //! server side producer's id.
                callback({ id })
    
                // if producers exist, then join room
                if (producersExist) getProducers()
            })
            } catch (error) {
            errback(error)
            }
        })
    
        connectSendTransport()
        })
    }

    //! 7. 6번에서 SEND transport를 생성한 후 connect 하기 위해 호출되는 함수   
    const connectSendTransport = async () => {
        // we now call produce() to instruct the producer transport
        // to send media to the Router
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
        // this action will trigger the 'connect' and 'produce' events above
        
        audioProducer = await producerTransport.produce(audioParams);
        videoProducer = await producerTransport.produce(videoParams);
    
        audioProducer.on('trackended', () => {
        console.log('audio track ended')
    
        // close audio track
        })
    
        audioProducer.on('transportclose', () => {
        console.log('audio transport ended')
    
        // close audio track
        })
        
        videoProducer.on('trackended', () => {
        console.log('video track ended')
    
        // close video track
        })
    
        videoProducer.on('transportclose', () => {
        console.log('video transport ended')
    
        // close video track
        })
    }

    //! 8 6번에서 방에 입장했을 때 이미 다른 참여자들이 있는 경우 실행됨 
    const getProducers = () => {
        socket.emit('getProducers', producerIds => {
        console.log('00000producerIds000000',producerIds)
        // for each of the producer create a consumer
        producerIds.forEach(id => signalNewConsumerTransport(id[0], id[1])) 
    
        // producerIds.forEach(signalNewConsumerTransport)
        })
        
    }

    //! 새 참여자 발생시 또는 8번에서 호출됨   1. ** 정해진 순서는 없고, new-producer 이벤트가 발생하면 호출되는 함수  
    const signalNewConsumerTransport = async (remoteProducerId, socketName) => {
        //check if we are already consuming the remoteProducerId
        if (consumingTransports.includes(remoteProducerId)) return;
        consumingTransports.push(remoteProducerId);

        
        await socket.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
        // The server sends back params needed 
        // to create Send Transport on the client side
        if (params.error) {
            console.log(params.error)
            return
        }
        // console.log(`PARAMS... ${params}`)
    
        let consumerTransport
        try {
            consumerTransport = device.createRecvTransport(params)
        } catch (error) {
            // exceptions: 
            // {InvalidStateError} if not loaded
            // {TypeError} if wrong arguments.
            console.log(error)
            return
        }
    
        consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
            // Signal local DTLS parameters to the server side transport
            // see server's socket.on('transport-recv-connect', ...)
            await socket.emit('transport-recv-connect', {
                dtlsParameters,
                serverConsumerTransportId: params.id,
            })
    
            // Tell the transport that parameters were transmitted.
            callback()
            } catch (error) {
            // Tell the transport that something was wrong
            errback(error)
            }
        })

        // //videoContainer id를 가진 요소를 가져온다
        // const videoContainer = document.getElementById('videoContainer');
        connectRecvTransport(consumerTransport, remoteProducerId, params.id, socketName)
        })
    }

    // server informs the client of a new producer just joined
    // 새로운 producer가 있다고 서버가 알려주는 경우! 
    socket.on('new-producer', ({ producerId, socketName }) => 
        signalNewConsumerTransport(producerId, socketName))

    //!새 참여자 발생시 2. 1번함수에서 호출되는 함수 -> 여기서 실질적으로 새로운 html 요소가 만들어지고 비디오 스트림을 받아옴 
    const connectRecvTransport = async (consumerTransport, remoteProducerId, serverConsumerTransportId, socketName) => {
        // for consumer, we need to tell the server first
        // to create a consumer based on the rtpCapabilities and consume
        // if the router can consume, it will send back a set of params as below
        

        await socket.emit('consume', {
            rtpCapabilities: device.rtpCapabilities,
            remoteProducerId,
            serverConsumerTransportId,
        }, async ({ params }) => {
            
        if (params.error) {
            
            console.log('Cannot Consume')
            return
        }
            
        
        // console.log(`Consumer Params ${params}`)
        // then consume with the local consumer transport
        // which creates a consumer
        const consumer = await consumerTransport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters
        })
        
    
        consumerTransports = [
            ...consumerTransports,
            {
            consumerTransport,
            serverConsumerTransportId: params.id,
            producerId: remoteProducerId,
            consumer,
            },
        ]
        
        // create a new div element for the new consumer media
        const wrapper = document.createElement('div') 
        const newElem = document.createElement('div') // 비디오 화면
        const newSpan = document.createElement('span')
        // newElem.setAttribute('id', `td-${remoteProducerId}`)
        wrapper.setAttribute('id', `td-${remoteProducerId}`)

        if (params.kind == 'audio') {
        //append to the audio container
        newElem.innerHTML = '<audio id="' + remoteProducerId + '" autoplay></audio>'
        } else {
        //append to the video container
        newElem.setAttribute('class', 'remoteVideo')
        newElem.innerHTML = '<video id="'+ remoteProducerId+ '" autoplay class="video" ></video> <p>'+ socketName +'</p>'
        }


        videoContainer.appendChild(newElem)
        videoContainer.appendChild(newSpan)

        wrapper.appendChild(newElem)
        wrapper.appendChild(newSpan)
        videoContainer.appendChild(wrapper)

        // destructure and retrieve the video track from the producer
        const { track } = consumer
    
        document.getElementById(remoteProducerId).srcObject = new MediaStream([track])
    
    
        // the server consumer started with media paused
        // so we need to inform the server to resume
        socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId })
        })
    }
    //! 누군가가 연결 종료될 때 발생 -> 해당 비디오 요소가 제거된다. 
    socket.on('producer-closed', ({ remoteProducerId }) => {
        // server notification is received when a producer is closed
        // we need to close the client-side consumer and associated transport
        const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId)
        producerToClose.consumerTransport.close()
        producerToClose.consumer.close()
    
        // remove the consumer transport from the list
        consumerTransports = consumerTransports.filter(transportData => transportData.producerId !== remoteProducerId)
    
        // remove the video div element
        videoContainer.removeChild(document.getElementById(`td-${remoteProducerId}`))
    })
    }


  return {
    
    init: () => {
        
        initCall();
        
    },
    
  };
};

export default MediasoupController;