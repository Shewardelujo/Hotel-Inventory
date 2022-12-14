import { CustomValidator } from './validators/custom-validator';
import { BookingService } from './booking.service';
import { ConfigService } from './../services/config.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { exhaustMap, map, mergeMap, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.router.snapshot.paramMap.get('id');

    this.bookingForm = this.fb.group(
      {
        //[''] is a shortcut to new FormControl('')
        roomId: new FormControl(
          { value: roomId, disabled: true },
          {
            validators: [Validators.required],
          }
        ),
        // roomId: new FormControl({value: '2', disabled: true}, {validators: [Validators.required]}),
        guestEmail: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          },
        ],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: [
          '',
          {
            updateOn: 'blur',
            //so blur is an event that should be called when you move out of a control
            // can be blur, change or submit... it is change by default... submit is useful when you don't have validation error or want to validate upon submission
          },
        ],
        guestName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            CustomValidator.ValidateName,
            CustomValidator.ValidateSpecialChar('*'),
          ],
        ],
        //nested form
        address: this.fb.group({
          addressLine1: ['', { validators: [Validators.required] }],
          addressLine2: [''],
          city: ['', { validators: [Validators.required] }],
          state: ['', { validators: [Validators.required] }],
          country: [''],
          zipCode: [''],
        }),
        //this.fb.array([]), we are providing an array of controls. where a button can be used to add a form.. it won't be a nested form but nested array of form
        //nested array of forms
        // guests: this.fb.array([this.addGuestControl()]),
        guests: this.fb.array([
          this.fb.group({
            guestName: ['', { validators: [Validators.required] }],
            age: new FormControl(''),
          }),
        ]),

        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      },
      { updateOn: 'blur', validators: [CustomValidator.ValidateDate] }
    );
    // this.getBookingData()

    //USE TO LISTEN TO CHANGES IN THE VALUE... and it will be called for each key press.. a way to avoid this is change the default value of updateOn to blur from change
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   // console.log(data);
    //   this.bookingService.bookRoom(data).subscribe((data) => {});
    // });

    //MERGEMAP DOES NOT CARE ABOUT THE SEQUENCE, AS SOON AS IT GETS THE DATA, A STREAM IS EMITTED
    //   this.bookingForm.valueChanges
    //     .pipe(mergeMap((data) => this.bookingService.bookRoom(data)))
    //     .subscribe((data) => console.log(data));
    // }

    //SWITCHMAP will cancel a new request, if it streams a new data
    // this.bookingForm.valueChanges
    //   .pipe(switchMap((data) => this.bookingService.bookRoom(data)))
    //   .subscribe((data) => console.log(data));

    //MERGEMAP CAREs ABOUT THE SEQUENCE, A STREAM IS ONLY EMITTED WHEN THE REQUEST IS COMPLETED

    this.bookingForm.valueChanges
      .pipe(exhaustMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => console.log(data));
  }

  addBooking() {
    console.log(this.bookingForm.value);
    //console.log(this.bookingForm.getRawValue); gives us values of even the form controls that are disabled

    // this.bookingService
    //   .bookRoom(this.bookingForm.getRawValue())
    //   .subscribe((data) => console.log(data));

    //TO RESET
    // this.bookingForm.reset()
    this.bookingForm.reset({
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      //nested form
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      //this.fb.array([]), we are providing an array of controls. where a button can be used to add a form.. it won't be a nested form but nested array of form
      //nested array of forms
      guests: [],
      tnc: false,
    });
  }

  getBookingData() {
    //SO WHENEVER YOU USE SET VALUE YOU HAVE TO PROVIDE A VALUE FOR ALL, I MEAN ALL THE FORM CONTROLS YOU HAVE AVAILABLE
    //wHILE IN PATCH VALUE, YOU ARE ALLOWED TO SKIP SOME OF THE CONTROLS
    this.bookingForm.setValue({
      guestEmail: 'test@gmail.com ',
      checkinDate: new Date('10-Feb-2020'),
      checkoutDate: new Date('20-Feb-2020'),
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      //nested form
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      //this.fb.array([]), we are providing an array of controls. where a button can be used to add a form.. it won't be a nested form but nested array of form
      //nested array of forms
      guests: [],
      tnc: false,
    });
  }

  addGuest() {
    this.guests.push(
      //push because we have set guest as a FormArray
      //either pushes a control or a group(an object)
      // this.addGuestControl()
      this.fb.group({
        guestName: ['', { validators: [Validators.required] }],
        age: new FormControl(''),
      })
    );
  }
  addGuestControl() {
    this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl(''),
    });
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
