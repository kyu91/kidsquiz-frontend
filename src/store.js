import {create} from 'zustand';

let useSocket = create((set) => ({
  socket: {},
  setSockets(){
    set((state) => ({
      socket: state.socket
    }));
  }


}));



export default useSocket;