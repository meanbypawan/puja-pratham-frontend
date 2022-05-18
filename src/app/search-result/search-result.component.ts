import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  keywords:any;
  products:any[]=[];
  cart:any[]=[];
  constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private route:Router,private productService:ProductService) {
    route.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.keywords = activatedRoute.snapshot.paramMap.get("keywords"); 
        productService.searchResult(this.keywords).subscribe(data=>{
          this.products = data;
        })
      }
    })
  }

  ngOnInit(): void {
    this.userService.viewCart().subscribe(data=>{
      if(data){
        this.cart = data.productList;
      }
    })
  }

  addToCart(productId:any){
    let flag=false;
    for(let element of this.cart){
      if(element._id == productId){
        flag=true;
        break;
      }
    }
    if(flag){
      alert("Product is already added to your cart");
    }
    else{
      this.userService.addToCart(productId).subscribe(data=>{
        if(data){
          alert("Product Added");
          this.ngOnInit();          
        }
      })
    }
  }
}
