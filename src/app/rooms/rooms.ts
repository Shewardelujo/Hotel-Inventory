export interface Room {
  totalRooms?: number;
  availableRooms: number;
  bookedRooms?: number;
}
export interface EachRoom {
  flowerVase: number;
  flowerType: string;
}

export interface RoomList {
  roomNumber?: string;
  roomType: string;
  amenities: string;
  price: number;
  photos: string;
  checkinTime: Date;
  checkoutTime: Date;
  rating: number;
}
