import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient) { }
  viewCategoryByType(type:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/product-category/view-product-category/"+type; 
    return this.http.get(api);
  }
  view():Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/product-category/view"; 
    return this.http.get(api);
  }
  viewMedia():Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/mediafile/view";
    return this.http.get(api);
  }
  viewMediaCategories():Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/mediafile-category/view";
    return this.http.get(api);
  }
  viewEventCategory():Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/event-category/view";
    return this.http.get(api);
  }
  viewTemple():Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/temple/view";
    return this.http.get(api);
  }
  viewMediaByCat(id:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/mediafile/view-by-cat/"+id;
    return this.http.get(api);
  }
  viewTempleByCategory(id:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/templePooja/view-event-categoryId";
    return this.http.post(api,{id});
  }
  viewOneTemplePuja(id:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/templePooja/view-one/" + id;
    return this.http.get(api);
  }
  viewOneMedia(id:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/mediafile/view-one/" + id;
    return this.http.get(api);
  }
  viewEventByCategory(id:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/event/view-event-categoryId";
    return this.http.post(api,{id});
  }
  viewOneEvent(id:string):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/event/view-one/"+id;
    return this.http.get(api);
  }
  bookEventOnCash(order:any):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/book-event/book-now-on-cash";
    return this.http.post(api,order);
  }
  createEvent():Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/book-event/create";
    return this.http.get(api);
  }
  bookEventOnline(order:any):Observable<any>{
    let api = "https://puja-pratham-backend.herokuapp.com/book-event/order-online";
    return this.http.post(api,order);
  }

}