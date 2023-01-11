import {create} from 'zustand';

let useStore = create((set) => ({
  names: [['홍길동', 1234]],
  setNames(e){
    set((state) => ({ names: [[...state.names], e ] }));
  },
}));



export default useStore;