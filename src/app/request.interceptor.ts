import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}
  //note with http interceptor you can't modify the original request but you can clone it and modify it
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.method === 'POST') {
      console.log('Request Interceptor', request);
      const newRequest = request.clone({
        headers: new HttpHeaders({ token: '123456789999999' }),
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
    // console.log('Request Interceptor', request);
    // const newRequest = request.clone({
    //   headers: new HttpHeaders({ token: '123456789999999' }),
    // });
    //return next.handle(newRequest); //sends your request to the server, if you don't call it, nothing will happen
  }
}
