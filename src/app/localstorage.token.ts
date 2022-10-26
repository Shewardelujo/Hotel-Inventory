import { InjectionToken } from '@angular/core';

//Using a custom provider allows you to provide a concrete implementation for implicit dependencies, such as built-in browser APIs. The following example uses an InjectionToken to provide the localStorage browser API as a dependency in the BrowserStorageService.
//The dependencies are implicit for a class if they exist only in the code within that class, and not in its public interface

export const localStorageToken = new InjectionToken('localStorage', {
  providedIn: 'root',
  factory() {
    return localStorage;
  },
});
