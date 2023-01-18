import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";


const client = createClient({
  publicApiKey: "pk_dev_Hu3Z_EqTP4vfecZUrp2FMiP3_8MzvpFz3J8FoV7-y1R-JPMzWRAnTd2y20pI5dWZ",
});

// Room : 사람들이 협업할 수 있는 별도의 가상공간 
// 멀티플레이 경험을 만드려면 여러 사용자가 같은 방 안에 연결되어 있어야 함.

// my-room-id, id.RoomProvider 
export const {
  suspense: {
    RoomProvider,
    useOthers, // 👈 룸에 연결된 다른 useOthers 사용자에 대한 정보를 제공하는 후크
    useUpdateMyPresence   // 👈
  },
} = createRoomContext(client);

