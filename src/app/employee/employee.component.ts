import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [RoomsService],
})
export class EmployeeComponent implements OnInit {
  empName: string = 'John';

  //@Self() makes  the service available here alone, that is for it to be used in this component, it has to be provided here, if not don't bother to go to the app module to check, just throw an error
  constructor(@Self() private roomsService: RoomsService) {}

  ngOnInit(): void {}
}
