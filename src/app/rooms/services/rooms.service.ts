import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { RoomList } from '../rooms';

@Injectable({
  providedIn: 'root',
  //root makes it available in the app  module provided array, and not manually written there.
  //root also get a SINGLE instance of this service available across, if you want another instance, you have to go to the ts file where you want the instance and in the @Component{providers: [RoomsService]}
  //any
})
export class RoomsService {
  //A service is a reusable class where you can put your logic

  // roomList: RoomList[] = [];

  //ShAREREPLAY in rxjs helps you to cache data and you don't need to make the api call again
  //remember we said a stream can't be modified after we subscribe to it, it can only be modified in a function called pipe, with pipe we can do anything to our data stream
  //Explaining getRooms$... getRooms is a property and $ is to make it known that it is a stream

  // headers = new HttpHeaders({ token: '123456789999999' });
  //headers can be passed into the http request header
  // getRooms$ = this.http
  //   .get<RoomList[]>('/api/rooms ', { headers: this.headers })
  //   .pipe(shareReplay(1));
  getRooms$ = this.http.get<RoomList[]>('/api/rooms ').pipe(shareReplay(1));
  // getRooms$ = this.http
  // .get<RoomList[]>('/api/rooms ', { headers: this.headers }). (
  //shareReplay operator... shareReplay()
  // shareReplay(1)
  //this means that we are replaying the last one record which we have received
  // );

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    //to use value providers, you should use the @Inject
    console.log(this.config.apiEndpoint);
    console.log('Rooms Service initialized');
  }

  //CRUD operations
  //READ
  getRooms() {
    // return this.roomList;

    return this.http.get<RoomList[]>('/api/rooms');
  }
  //CREATE
  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('api/rooms', room);
  }
  //UPDATE
  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>('api/rooms/${room.roomNumber}', room);
  }
  //DELETE
  delete(id: string) {
    return this.http.delete<RoomList[]>(`api/rooms/${id}`);
  }
  //http above is from httpClient.. helps you with getting data from the backend server
  //httpRequest below is from httpRequest.. helps you with getting data from an online api server
  //we now have this.http.request(request)... request which is a new httpRequest

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
  }
}
