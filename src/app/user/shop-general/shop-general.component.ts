import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
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

  constructor(private shopService: ShopServiceService,private userService:UserService
    ,private toasterService:ToastrService,private spinner:NgxSpinnerService) {
    this.shopService.ViewProduct().subscribe(data => {
      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
      if (data) {
        for (let element of data) {
          element.discountedPrice = element.price - (element.price * element.discount / 100);
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
        // alert("Product is already added to your cart");
        this.toasterService.warning('Item Already Added In Cart','Warning');
      }
      else{
        this.userService.addToCart(productId).subscribe(data=>{
          if(data){
          this.toasterService.success('Item Added Successfully','Success');
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
