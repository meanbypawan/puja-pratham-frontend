import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopServiceService } from 'src/app/service/shop-service.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-shop-general-all',
  templateUrl: './shop-general-all.component.html',
  styleUrls: ['./shop-general-all.component.css']
})
export class ShopGeneralAllComponent implements OnInit {
  typeList: any[] = [];
  p: number = 1;
  total: number = 0;
  type: any;
  cart:any[]=[];
  constructor(private userService:UserService,private shopService: ShopServiceService, private activatedRoute: ActivatedRoute) {
    this.type = activatedRoute.snapshot.paramMap.get("type");
    console.log(this.type)
    this.shopService.ViewProduct().subscribe(data => {
      if (data) {
        for (let element of data) {
          if (element.catId.type == this.type)
            this.typeList.push(element);
        }
      }
      else
        alert('Something went wrong')
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

  pageChangeEvent(event: number) {
    this.p = event;
    this.typeList;
  }
  addToCart(productId: any) {
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