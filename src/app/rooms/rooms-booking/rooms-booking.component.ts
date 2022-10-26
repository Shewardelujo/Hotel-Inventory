import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  id: number = 0;
  //2. using rxjs operators on streams
  //remember you can only modify a stream using pipe.... then either the map, shareReplay or catchError operators
  // id$ = this.router.params.pipe(map((params) => params['roomId']));
  //paramMap is the option when you have multiple parameters
  id$ = this.router.paramMap.pipe(map((params) => params.get('roomId')));
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    // this.router.params.subscribe((params) => {
    // this.id = params['roomId'];
    //params is an object with the its property has declared in the dynamic route in app routing module
    // console.log(params);
    // });
    //remember we had already said that we shouldn't subscribe but rather use rxjs operators, so that we don't have to start unsubscribing
    //1. we can use snapshot... The downside to which is that snapshot will never update the data on the page in case you are changing the route value in the same view
    // this.id = this.router.snapshot.params['roomId'];
  }
}
