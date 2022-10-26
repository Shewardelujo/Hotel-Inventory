import { InjectionToken } from '@angular/core';
import { AppConfig } from './appconfig.interface';
import { environment } from '../../environments/environment';

//InjectionToken Creates a token that can be used in a DI Provider.
//Use an InjectionToken whenever the type you are injecting is not reified (does not have a runtime representation) such as when injecting an interface, callable type, array or parameterized type.
//new InjectionToken<MyInterface>('SomeToken'));

//CREATING THE VALUE PROVIDER

//INJECTION_TOKEN
export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

//TYPE
export const APP_CONFIG: AppConfig = {
  apiEndpoint: environment.apiEndpoint,
};

//so, it means we are creating a new token to be used in the provider at app module, then type to be injected in the token is AppConfig
//It is a token we inject a type into it and then use it in the provider
//so in the provider, we provide both the token and the type declared
