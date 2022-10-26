import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent implements OnInit {
  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0,
  };
  successMessage: string = '';
  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {}
  AddRoom() {
    this.roomsService.addRoom(this.room).subscribe((room) => {
      this.successMessage = 'Room Added successfully.';
    });
  }
}
