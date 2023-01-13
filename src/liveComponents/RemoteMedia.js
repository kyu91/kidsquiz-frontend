import React from 'react';
import * as mediasoupClient from 'mediasoup-client';

const RemoteMedia = ({remoteProducerId, params, socketName, srcObject}) => {

  const newElem = params.kind === 'audio' ? 
    <audio id={remoteProducerId} autoPlay src=''/> : 
    <div className="remoteVideo">
      <video id={remoteProducerId} autoPlay className="video" src={srcObject}/>
      <p>{socketName}</p>
    </div>;
  
  return (
    <div id={`${remoteProducerId}`}>
      {newElem}
      <span />
    </div>
  );
}

export default RemoteMedia;