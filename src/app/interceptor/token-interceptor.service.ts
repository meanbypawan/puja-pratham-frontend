import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
  constructor() { }
  intercept(request:HttpRequest<any>,next:HttpHandler){
     let tokenizedRequest = request.clone({
       setHeaders:{
         authorization: ''+sessionStorage.getItem('token')
       }
     });
     return next.handle(tokenizedRequest);
  }
}
