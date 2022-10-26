import { HttpEventType } from '@angular/common/http';
import { makeBindingParser } from '@angular/compiler';
import {
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  ViewChild,
  ViewChildren,
  QueryList,
  SkipSelf,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, Subject, Subscription, map } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { Room, EachRoom, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked
{
  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = true;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 10,
    availableRooms: 6,
    bookedRooms: 4,
  };

  title = 'Room List';

  roomSpec: EachRoom = {
    flowerVase: 3,
    flowerType: 'hibiscus',
  };

  roomList: RoomList[] = [];
  //@ViewChild is creating a new instance of our header component in the rooms component and can be accessed here and modified etc in this ts file.
  //@ViewChild can only be accessed in ngAfterViewInit, but if we want to be able to access it elsewhere then you have to make static true, which by default is false
  //static true will make it accessible across all the life cycles
  // @ViewChild(HeaderComponent, { static: true })
  // headerComponent!: HeaderComponent;

  //Also ViewChild is for one instance and ViewChildren is for multiple instances
  //static is false in ViewChildren and can not be changed

  stream = new Observable<string>((observer) => {
    observer.next(' user1');
    observer.next(' user2');
    observer.next(' user3');
    observer.complete();
    observer.error('error');

    //next emits a new data
    //complete is when the stream completes

    //so, in rxjs, there are 2 key things
    //1. the observables which we subscribe to
    //2. the observables have an observer that watches for changes and gets notified when changes are made and it internally calls next, so whoever has subscribed to it gets the new value
    //SO BASICALLY, YOU DO NOT AVE TO CREATE ALL THE .NEXT .COMPLETE ETC ABOVE, WE JUST DID THAT FOR YOU TO KNOW HOW OBSERVABLES WORK INTERNALLY
  });

  @ViewChild(HeaderComponent)
  headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  totalBytes = 0;
  //unsubscribing isn't actually feasible for all subscriptions done, hence asyncPipe makes it possible to manage our subscription for us... using Subscription from rxjs
  // subscription!: Subscription;

  // rooms$ = this.roomsService.getRooms$;

  //to catch error
  //the error is a new subject of type string and it is a stream.. more like this is where the error will be stored when gotten.
  error$ = new Subject<string>();
  //getError$ is we subscribing to the error stream, remember the stream gets updated and anyone subscribes to it automatically gets the update pushed into the stream.
  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      //normally you shouldn't call next in your component but inside your service.ts because it causes your default change detection to run again but we use it here
      //with next we are pushing the err.message into error$, the error stream
      this.error$.next(err.message);
      return of([]);
      // meaning return an empty array
    })
  );
  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));

  //Dependency injection says don't create an instance of a class directly
  //roomService = new RoomService(); this is how to directly create a class instance

  //You don't have to do SkipSelf, because an
  constructor(@SkipSelf() private roomsService: RoomsService) {
    //the services should always be private else you will be able to access it from the html TEMPLATE, which shouldn't be, it should only be accessible from the ts file
  }

  ngOnInit(): void {
    //getting the photos from jsonPlaceholder server

    // this.roomsService.getPhotos().subscribe((data) => console.log(data));
    //the above code actually gives multiple but 2 major response
    //1. HttpHeaderResponse and the information we get here is to let you know that your request to the server has been sent
    // 1-2. An object which shows that the data is loading already and how much data is loaded
    //2. HttpResponse when we get a response
    //the difference between the first and the second response is that the second  response contains body (which is the main response)
    //So, lets say we have an api that takes time to load the data and you have a lot of records to display from it and while waiting we don't want to make the user think that the application has hanged, you can show some user
    //and what we get is actually not the data but multiple event, that we can call and act on thereby by subscribing to multiple events

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });

    // this.roomList = this.roomsService.getRooms();
    // this.stream.subscribe({
    //   next: (value) => console.log(value),
    //   complete: () => console.log('complete'),
    //   error: () => console.log('error'),
    // });

    this.stream.subscribe((data) => console.log(data));
    //this is using http get via http client and then using pipe for modification before subscribing and now here subscribing
    //this makes us get the api call once and then have access to the data repeatedly
    // this.subscription = this.roomsService.getRooms$.subscribe(
    //   (rooms) => (this.roomList = rooms)
    // ); now if we don't want to do it this way then we use async pipe... rooms$ = this.roomsService.getRooms$; and in the html call it

    //this is using http get via http client
    // this.roomsService.getRooms().subscribe((rooms) => (this.roomList = rooms));
    //SUBSCRIBE is from rxjs, in this case we are taking whatever is coming from the server through the rooms service and then equating it with this.roomsList, and since we are subscribing, we get any updates from the server through the rooms service without calling again
    //Observables are streams of data which we can subscribe to
  }

  ngDoCheck(): void {
    // console.log('on changes is called');
    //ngOnChanges detects any changes to your @input
    //ngDoCheck detects any changes to your entire component
    //it is called after the default change detection is done (that is without the onPush)
    //so you shouldn't implement ngOnChanges and ngDoCheck together on the same component
    //Try to avoid doCheck as much as possible
  }
  ngAfterViewInit(): void {
    // console.log(this.headerComponent);
    //this is only where I can access the header component instance, when static is set to false (the default), and it is better to be set to false because when the headerComponent has async function in ngOnInit, it might be blocked in this component since static is set to true.
    this.headerComponent.title = 'Rooms View';
    this.headerChildrenComponent.last.title = 'Last Title';

    //moreover the error in the console is normal because in development mode, angular runs change detection twice
  }

  ngAfterViewChecked(): void {
    //* A callback method that is invoked immediately after the default change detector has completed one change-check cycle for a component's view.
    // at this point angular has completed running all the life cycle check once
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    //this is to do whatever you intend to do with the $event, emitted event, which we now refer to as room here
    this.selectedRoom = room;
    console.log(room);
  }
  addRoom() {
    const room: RoomList = {
      roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, TV, Restroom, Free internet access',
      price: 1000,
      photos:
        'https://tranducfurnishings.com/wp-content/uploads/2021/06/Ritz-Carlton-Grand-Lake-Florida-2v22.jpg',
      checkinTime: new Date('13-Apr-2022'),
      checkoutTime: new Date('20-Sept-2022'),
      rating: 4.5,
    };
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });

    // this.roomList = [...this.roomList, room];
    // this.roomList.push(room);
    //a new object or array has to be returned when trying to modify the component that has ChangeDetectionStrategy, in this case the room-list component, else it wont work
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, TV, Restroom, Free internet access',
      price: 1000,
      photos:
        'https://tranducfurnishings.com/wp-content/uploads/2021/06/Ritz-Carlton-Grand-Lake-Florida-2v22.jpg',
      checkinTime: new Date('13-Apr-2022'),
      checkoutTime: new Date('20-Sept-2022'),
      rating: 4.5,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}

//Understanding Rxjs   (Push Method)
// getData() -> addData() -> getData().... pull method in normal javascript
// getData() -> continuos stream of data -> addData()... push method rxjs
//in the push method rxjs , any subscriber will have access to the data stream updates, even without calling getData() again

//wgy do we need rxjs
//rxjs gives you a stream of data, which can't be modified and can only be modified before it is subscribed to
//how do we modify those data and that is why operators are useful

//DOWN SIDE TO USING .subscribe
//Just like when you subscribe to netflix and you want to cancel your subscription then you forget to do so, you will face the consequence by paying the price of the subscription, so, its the same with the subscribe here
//so what price will you pay have to pay here
//the standard way: when you subscribe to a stream, you should unsubscribe, in nOnDestroy
//unsubscribing isn't actually feasible for all subscriptions done, hence asyncPipe makes it possible to manage our subscription for us... using Subscription from rxjs
