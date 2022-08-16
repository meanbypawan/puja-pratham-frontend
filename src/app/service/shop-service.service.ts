import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {

  productView = 'https://puja-pratham-backend.herokuapp.com/product/view';
  // categoryView='http://localhost:3000/product-category/view';
  // photoFrams='http://localhost:3000/mediafile-category/view';
  constructor(private http: HttpClient) {}
  
  ViewProduct():Observable<any> {
  return this.http.get(this.productView);
  }

}
