import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {

  ID='';
  product:any;

  cart:any[]=[];

  points:any[]=[];


  constructor(private userService:UserService,private prouctService: ProductService, private ActivatedRoute: ActivatedRoute, private router:Router) {
  this.router.events.subscribe(event=>{
  this.ID = <string>this.ActivatedRoute.snapshot.paramMap.get("id");
  if(event instanceof NavigationEnd){
    this.prouctService.ViewMore(this.ID).subscribe(data=>{
      console.log(data)
      this.product = data;
      let des = data.description;
      this.points = des.split("\n");
      console.log(this.points); 
    })
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
  ngOnInit(): void {
    this.userService.viewCart().subscribe(data=>{
      if(data){
        this.cart = data.productList;
      }
    })
  }

}
