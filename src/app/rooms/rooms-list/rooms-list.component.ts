import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  //changeDetection onPush ensures that we aren't running change detection on this component until or unless needed, when something is pushed into it. AND first your component should not change the data internally, so the assigning or passing should come from the parent component.. ALSO, the data from the parent component should be immutable, return a new object or array,so that same concept of state management applies here. hence why we do *this.roomList = [...this.roomList, room]
  //ngOnChanges can also only be applied to components that has the @Input decorator
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  //@Input() makes rooms a valid html property in the above templateUrl passed into it when the parent is calling the child component
  @Input() rooms: RoomList[] = [];
  @Input() title: string = '';
  @Input() price = 0;
  // @Output() makes the selectedRoom/selectRoom function a valid event property in the above templateUrl
  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    //ngOnChanges can also only be applied to components that has the @Input decorator, when you get a new value instance from the parent component
    //Then you can decide to use the value for whatever rocks your boat
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    //this is called when the component is removed from the DOM
    //useful when you have memory consuming codes
    console.log('on destroy is called');
  }
  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}
