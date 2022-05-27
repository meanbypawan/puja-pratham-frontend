import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptorService implements HttpInterceptor{
  cache:Map<string,HttpResponse<any>> = new Map<string,HttpResponse<any>>();
  constructor() { }
  intercept(request:HttpRequest<any>,next:HttpHandler){
    if(request.method !='GET'){
      return next.handle(request);
    }
    let cachedResponse =   this.cache.get(request.url);
    if(cachedResponse){
      return of(cachedResponse);
    }else{
      return next.handle(request).pipe(tap(statevent=>{
            if(statevent instanceof HttpResponse){
              this.cache.set(request.url,statevent.clone());
            }
      }));
    }
  }
}
