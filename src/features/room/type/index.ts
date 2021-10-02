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

export interface Screen {
  _id: string;
  name: string;
  weekdayPrice: number;
  weekendPrice: number;
}

export interface ScreenRespone {
  success: boolean;
  message: string;
  values: {
    screens: Screen[];
  };
}
