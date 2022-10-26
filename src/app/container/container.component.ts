import {
  Component,
  AfterContentInit,
  OnInit,
  ContentChild,
  Host,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
// import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers: [RoomsService],
})
export class ContainerComponent implements OnInit, AfterContentInit {
  //in @ContentChild, there are no static true or false, and you can only access it in ngAfterContentInit
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  // constructor(@Host() private roomsService: RoomsService) {}
  constructor() {}
  ngAfterContentInit(): void {
    this.employee.empName = 'Walter';
  }

  ngOnInit(): void {}
}
