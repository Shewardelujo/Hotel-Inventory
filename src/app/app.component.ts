import { ConfigService } from './services/config.service';
import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Optional,
  Inject,
} from '@angular/core';
import { localStorageToken } from './localstorage.token';
import { LoggerService } from './logger.service';
// import { RoomsComponent } from './rooms/rooms.component';
import { InitService } from './init.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hotelInventoryapp';

  role = 'Admin';

  //The @Optional property decorator tells Angular to return null when it can't find the dependency
  //@Optional() is used for when you don't declare a provider
  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitService,
    private ConfigService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }

  //The Inject decorator is a constructor parameter used to specify a custom provider of a dependency
  //this is to dynamically load as component using viewChild using ng-template
  //user gives us reference to the user tag
  //ViewContainerRef helps us to dynamically load a component
  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  // @ViewChild(HeaderComponent)
  // headerComponent!: HeaderComponent;
  // @ViewChild(componentName) what you want to refer to it as: componentName
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
  //ElementRef enables us to dynamically load an element, in this case a div
  @ViewChild('name', { static: true }) name!: ElementRef;
  ngOnInit(): void {
    //we subscribe to observables
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // });
    //filtering out the other events using rxjs
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log('Navigation Started');
      });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('Navigation Ended');
      });
    this.loggerService?.log('AppComponent.ngOnInit()');

    this.name.nativeElement.innerText = 'Hilton Hotel';
    this.localStorage.setItem('name', 'Hilton Hotel');
  }
}
