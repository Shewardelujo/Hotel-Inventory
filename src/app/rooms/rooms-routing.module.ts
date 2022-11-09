import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsComponent } from './rooms.component';

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent,
    //children is useful for nested routing
    children: [
      //add normal routes before dynamic routes
      { path: 'add', component: RoomsAddComponent },

      //DYNAMIC ROUTE
      { path: ':roomId', component: RoomsBookingComponent },
    ],
  },
  // { path: 'rooms/add', component: RoomsAddComponent },
  //DYNAMIC ROUTE
  // { path: 'rooms/:roomId', component: RoomsBookingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
