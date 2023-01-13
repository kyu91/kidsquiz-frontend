import {create} from 'zustand';

let useProducerId = create((set) => ({
  useproducerId: [],
  setProducerId : (state) =>{
    set((e) => ({
      useproducerId: [...state.useproducerId, e]
    }));
  }


}));

export default useProducerId;