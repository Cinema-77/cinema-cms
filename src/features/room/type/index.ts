export interface TimeSlot {
  _id: string;
  time: string;
}

export interface TimSlotRespone {
  success: boolean;
  message: string;
  values: {
    timeSlots: TimeSlot[];
  };
}

export interface ScreenType {
  _id: string;
  name: string;
  weekdayPrice: number;
  weekendPrice: number;
}

export interface ScreenRespone {
  success: boolean;
  message: string;
  values: {
    screens: ScreenType[];
  };
}

export interface Room {
  _id: string;
  name: string;
  rowNumber: number;
  seatsInRow: number;
  screen: string;
  cinema: string;
}
export interface RoomRespone {
  success: boolean;
  message: string;
  values: {
    rooms: Room[];
  };
}

export interface RoomByScreenRespone {
  success: boolean;
  message: string;
  rooms: Room[];
}
