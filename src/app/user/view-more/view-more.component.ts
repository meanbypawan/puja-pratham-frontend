import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {

  id='';
  product:any;

  cart:any[]=[];

  points:any[]=[];

  constructor(private userService:UserService,private prouctService: ProductService, private ActivatedRoute: ActivatedRoute, private router:Router,private toasterService:ToastrService) {
    this.router.events.subscribe(event=>{
    this.id = <string>this.ActivatedRoute.snapshot.paramMap.get("id");
    if(event instanceof NavigationEnd){
      this.prouctService.ViewMore(this.id).subscribe(data=>{
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
  if(sessionStorage.getItem("user")){
    let flag=false;
    for(let element of this.cart){
      if(element._id == productId){
        flag=true;
        break;
      }
    }
    if(flag){
      // alert("Product is already added to your cart");
      this.toasterService.warning('Item Already Added In Cart','Warning')
    }
    else{
      this.userService.addToCart(productId).subscribe(data=>{
        if(data){
          this.toasterService.success('Item Added Successfully','Success')
          this.ngOnInit();
        }
      })
    }
  }else 
  this.toasterService.warning('Please Login First','Warning')
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
}