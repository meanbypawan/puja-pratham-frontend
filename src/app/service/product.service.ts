import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  viewAll = 'http://localhost:3000/product/view';
  view= 'http://localhost:3000/product/view-categoryid';
  viewMore = 'http://localhost:3000/product/view-productid'

  constructor(private http: HttpClient) { }

  public allProduct():Observable<any>{
    return this.http.get(this.viewAll)
  }

  public productViewbyCategoryId(id:string):Observable<any>{
    return this.http.post(this.view ,{catId:id });
  }
  
  public ViewMore(id:string):Observable<any>{
    return this.http.post(this.viewMore, {_id:id});
  }
}
