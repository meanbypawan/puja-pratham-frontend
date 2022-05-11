import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  viewCategoryByType(type:string):Observable<any>{
    let api = "http://localhost:3000/product-category/view-product-category/"+type; 
    return this.http.get(api);
  }
  view():Observable<any>{
    let api = "http://localhost:3000/product-category/view"; 
    return this.http.get(api);
  }
  viewMedia():Observable<any>{
    let api = "http://localhost:3000/mediafile/view";
    return this.http.get(api);
  }
  viewMediaCategories():Observable<any>{
    let api = "http://localhost:3000/mediafile-category/view";
    return this.http.get(api);
  }
  viewEvent():Observable<any>{
    let api = "http://localhost:3000/event/view";
    return this.http.get(api);
  }
}
