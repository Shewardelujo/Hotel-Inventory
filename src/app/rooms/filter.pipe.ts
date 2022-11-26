import { RoomList } from './rooms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  //first properties to transform is what is to be transformed, second one is the arguments, that is, the factor it will be transformed based on
  transform(rooms: RoomList[], price: number): RoomList[] {
    return rooms.filter((room) => room.price > price);
  }
}
