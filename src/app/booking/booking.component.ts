import { ConfigService } from './../services/config.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  //FormControl class is used to create Form controls
  //FormGroup class is used to group multiple controls
  //FormBuilder is used to build complex forms... it is a service and we have to inject it
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray; // this is so that we can easily access this in the addGuest function
  }

  constructor(private configService: ConfigService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      //[''] is a shortcut to new FormControl('')
      roomId: new FormControl(''),
      // roomId: new FormControl({value: '2', disabled: true}),
      guestEmail: [''],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: [''],
      //nested form
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      //this.fb.array([]), we are providing an array of controls. where a button can be used to add a form.. it won't be a nested form but nested array of form
      //nested array of forms
      guests: this.fb.array([this.addGuestControl()]),
    });
  }

  addBooking() {
    console.log(this.bookingForm.value);
    //console.log(this.bookingForm.getRawValue); gives us values of even the form controls that are disabled
  }

  addGuest() {
    this.guests.push(
      //push because we have set guest as a FormArray
      //either pushes a control or a group(an object)
      this.addGuestControl()
    );
  }
  addGuestControl() {
    this.fb.group({ guestName: [''], age: new FormControl('') });
  }
  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }
  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}
