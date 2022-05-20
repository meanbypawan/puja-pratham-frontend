import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/service/shop-service.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-shop-general',
  templateUrl: './shop-general.component.html',
  styleUrls: ['./shop-general.component.css']
})
export class ShopGeneralComponent implements OnInit {

  productList: any[] = [];
  packageList: any[] = [];
  photoFrameList: any[] = [];
  murtiList: any[] = [];
  cart:any[]=[];

  constructor(private shopService: ShopServiceService,private userService:UserService) {
    this.shopService.ViewProduct().subscribe(data => {
      if (data) {
        for (let element of data) {
          if (element.catId.type == "product")
            this.productList.push(element);
          else if (element.catId.type == "package")
            this.packageList.push(element);
          else if (element.catId.type == "photo")
            this.photoFrameList.push(element);
          else if(element.catId.type == "Murti")
            this.murtiList.push(element);
        }
      }
      else
        alert('Something went wrong')
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
