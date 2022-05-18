import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}
  sentOtp(formdata:FormData):Observable<any>{
    let api = "http://localhost:3000/user/add";
    return this.http.post(api,formdata);
  }
  register(otp:string,id:string):Observable<any>{
    let api = "http://localhost:3000/user/register-by-otp";
    return this.http.post(api,{otp,id});
  }

  login(email:string,password:string):Observable<any>{
    let api = "http://localhost:3000/user/login";
    return this.http.post(api,{email,password});
  }

  resendOtp(id:string):Observable<any>{
    let api = "http://localhost:3000/user/resend-otp/"+id;
    return this.http.get(api);
  }
  // forgetPassword(){
  //   let api = "http://localhost:3000/user/"
  // }

  editProfile(formdata:FormData):Observable<any>{
   let api = "http://localhost:3000/user/update-profile"
    return this.http.post(api,formdata);
  }
  
  viewOneUser():Observable<any>{
   let id = JSON.parse(sessionStorage.getItem("user" || "{}")).id;
   let api = "http://localhost:3000/user/viewOne/"+id;
   return this.http.get(api);
  }

}
