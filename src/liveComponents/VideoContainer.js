// import React from 'react';

// const VideoContainer = ({ remoteProducerId, params, socketName }) => {
//     const videoContainerRef = React.useRef(null);
//     const wrapperRef = React.useRef(null);
//     const newElemRef = React.useRef(null);
//     const newSpanRef = React.useRef(null);
  
//     React.useEffect(() => {
//       wrapperRef.current = document.createElement('div');
//       newElemRef.current = document.createElement('div');
//       newSpanRef.current = document.createElement('span');
  
//       wrapperRef.current.setAttribute('id', `td-${remoteProducerId}`);
  
//       if (params.kind === 'audio') {
//         newElemRef.current.innerHTML = `<audio id="${remoteProducerId}" autoplay></audio>`;
//       } else {
//         newElemRef.current.setAttribute('class', 'remoteVideo');
//         newElemRef.current.innerHTML = `<video id="${remoteProducerId}" autoplay class="video"></video> <p>${socketName}</p>`;
//       }
  
//       wrapperRef.current.appendChild(newElemRef.current);
//       wrapperRef.current.appendChild(newSpanRef.current);
//       videoContainerRef.current.appendChild(wrapperRef.current);
//     }, []);
  
//     return <div ref={videoContainerRef} />;
//   };

// export default VideoContainer;