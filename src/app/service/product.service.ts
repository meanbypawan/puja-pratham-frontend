import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  viewAll = 'https://puja-pratham-backend.herokuapp.com/product/view';
  view= 'https://puja-pratham-backend.herokuapp.com/product/view-categoryid';
  viewMore = 'https://puja-pratham-backend.herokuapp.com/product/view-productid'

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
  public searchResult(search:any){
    let api = "https://puja-pratham-backend.herokuapp.com/product/search";
    return this.http.post<any>(api,{keywords:search});
  }
}
