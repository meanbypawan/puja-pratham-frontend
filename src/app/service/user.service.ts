import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}
  sentOtp(formdata:FormData):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/user/add";
    return this.http.post(api,formdata);
  }
  register(otp:string,id:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/user/register-by-otp";
    return this.http.post(api,{otp,id});
  }

  login(email:string,password:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/user/login";
    return this.http.post(api,{email,password});
  }

  resendOtp(id:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/user/resend-otp/"+id;
    return this.http.get(api);
  }
  // forgetPassword(){
  //   let api = "https://puja-pratham-backend.herokuapp.com/user/"
  // }

  editProfile(formdata:FormData):Observable<any>{
   let api = "https://puja-pratham-backend.herokuapp.com/user/update-profile"
    return this.http.post(api,formdata);
  }
  
  viewOneUser():Observable<any>{
   let id = JSON.parse(sessionStorage.getItem("user" || "{}")).id;
   let api = "https://puja-pratham-backend.herokuapp.com/user/viewOne/"+id;
   return this.http.get(api);
  }
  
  public addToCart(productId:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/cart/add-to-cart";
    let userId = JSON.parse(sessionStorage.getItem("user")|| "{}").id;
    return this.http.post(api,{userId:userId,productId:productId});
  }
  public viewCart():Observable<any>{
    let userId = JSON.parse(sessionStorage.getItem("user")|| "{}").id;
    let api = "https://puja-pratham-backend.herokuapp.com/cart/view-one/"+userId;
    return this.http.get(api);
  }
  public removeFromCart(productId:any):Observable<any>{
    let userId = JSON.parse(sessionStorage.getItem("user")|| "{}").id;
    let api = "https://puja-pratham-backend.herokuapp.com/cart/delete-product/"+userId+"/"+productId;
    return this.http.delete(api);
  }

  public placeOrder(order:any):Observable<any>{
    let userId = JSON.parse(sessionStorage.getItem("user")|| "{}").id;
    order.userId = userId;
    let api = "https://puja-pratham-backend.herokuapp.com/order/place-order-by-cash";
    return this.http.post(api,order);
  }

  public deletecart():Observable<any>{
    let userId = JSON.parse(sessionStorage.getItem("user")|| "{}").id;
    let api = "https://puja-pratham-backend.herokuapp.com/cart/delete-cart/" + userId;
    return this.http.delete(api);
  }

  public createOrder():Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/order/create";
    return this.http.get(api);
  }
  public placeOrder2(order:any):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/order/order-status";
    return this.http.post(api,order);
  }

  public orderHistory():Observable<any>{
    let userId = JSON.parse(sessionStorage.getItem("user")|| "{}").id;
    let api = "http://localhost:3000/order/view-orders/"+userId;
    return this.http.get(api);
  }

  socialLogin(user:SocialUser):Observable<any>{
    let socialApi = "https://puja-pratham-backend.herokuapp.com/user/login-by-social-media";
    return this.http.post(socialApi,{name : user.name,email : user.email,image : user.photoUrl})
  }

  createTemplePooja():Observable<any>{
    let api = "http://localhost:3000/book-temple-pooja/create";
    return this.http.get(api);
  }

  placeTemplePooja(order:any):Observable<any>{
    let api = "http://localhost:3000/book-temple-pooja/place";
    return this.http.post(api,order);
  }

  public viewOrderedProduct(orderId:any):Observable<any>{
    let api = "http://localhost:3000/order/view-one-order/" + orderId;
    return this.http.get(api);
  }

  public reviewProduct(comment:any):Observable<any>{
    let api = "http://localhost:3000/product/add-rating-and-comment";
    return this.http.post(api,comment);
  }
  
}
