import create from 'zustand';

import { Room, getRoomsByMovie } from '@/features/room';

type RoomsByMovie = {
  listRoomByMovie: Room[];
  loading: boolean;
  fetchRooms: (idMovie: string) => void;
  checkedTimes: ({
    _id,
    roomName,
    screenName,
  }: {
    _id: string;
    roomName: string;
    screenName: string;
  }) => void;
  dismissTimeScreen: (id: string) => void;
};

export const useRoomsByMovieStore = create<RoomsByMovie>((set) => ({
  listRoomByMovie: [],
  loading: false,
  fetchRooms: async (idMovie: string) => {
    set({ loading: true });
    const response = await getRoomsByMovie({ idMovie });
    const { rooms } = response.values;
    const listRoom: Room[] = [];
    for (const room of rooms) {
      const newTime = room.timeSlots.map(({ _id, time }) => ({
        _id,
        time,
        disabled: false,
      }));
      listRoom.push({ ...room, timeSlots: newTime });
    }
    set({ listRoomByMovie: listRoom, loading: false });
  },
  checkedTimes: ({ _id, roomName, screenName }) =>
    set((state) => {
      let rooms;
      switch (screenName) {
        case '2D':
          rooms = state.listRoomByMovie.filter((r) => r.name !== roomName && r.screen.name == '2D');
          for (const r of rooms) {
            const time = r.timeSlots.find((t) => t._id === _id);
            if (time) {
              time.disabled = !time.disabled;
            }
          }
          return { ...state, listRoomByMovie: [...state.listRoomByMovie] };
        case '3D':
          rooms = state.listRoomByMovie.filter((r) => r.name !== roomName && r.screen.name == '3D');
          for (const r of rooms) {
            const time = r.timeSlots.find((t) => t._id === _id);
            if (time) {
              time.disabled = !time.disabled;
            }
          }
          return { ...state, listRoomByMovie: [...state.listRoomByMovie] };
        case 'IMax':
          rooms = state.listRoomByMovie.filter(
            (r) => r.name !== roomName && r.screen.name == 'IMax'
          );
          for (const r of rooms) {
            const time = r.timeSlots.find((t) => t._id === _id);
            if (time) {
              time.disabled = !time.disabled;
            }
          }
          return { ...state, listRoomByMovie: [...state.listRoomByMovie] };
        default:
          return { ...state, listRoomByMovie: [...state.listRoomByMovie] };
      }
    }),
  dismissTimeScreen: (id: string) => {
    console.log(id);
  },
}));
