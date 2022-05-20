import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-shop-specific',
  templateUrl: './shop-specific.component.html',
  styleUrls: ['./shop-specific.component.css'],
  // providers:[UserService]
})
export class ShopSpecificComponent implements OnInit {
 catid='';
 products:any[]=[];
 cart:any[]=[];

  constructor(private userService:UserService, private productService:ProductService, private ActivatedRoute:ActivatedRoute, private router:Router, ) { 
   this.router.events.subscribe(event=>{
     this.catid   =  <string>this.ActivatedRoute.snapshot.paramMap.get("id");
     if(event instanceof NavigationEnd){
       this.productService.productViewbyCategoryId(this.catid).subscribe(data=>{
         console.log(data)
         this.products = data;
       })
     }
   })

  }
  ngOnInit(): void {
    if(sessionStorage.getItem("user")){
      this.userService.viewCart().subscribe(data=>{
        if(data){
          this.cart = data.productList;
          console.log(this.cart);
        }
      })
    }
  }

  addToCart(productId:any){
    if(sessionStorage.getItem("user")){
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
    }else 
      alert("Please Login First");
  }

}
