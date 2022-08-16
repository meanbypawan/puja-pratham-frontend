import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopServiceService } from 'src/app/service/shop-service.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
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
  totalCounter:any;
  constructor(private userService:UserService,private shopService: ShopServiceService, private activatedRoute: ActivatedRoute,
    private toasterService:ToastrService,private spinner:NgxSpinnerService) {
    this.type = activatedRoute.snapshot.paramMap.get("type");
    console.log(this.type)
    this.shopService.ViewProduct().subscribe(data => {
      if (data) {
        for (let element of data) {
          if (element.catId.type == this.type){
       
            console.log(element)
            this.spinner.show();
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 2000);
            this.typeList.push(element);
            // console.log(this.typeList.discountedPrice)
        }
      }
      }
      else
      this.toasterService.error("Error","Something Went Wrong");
    })

  }


  ngOnInit(): void {
    if(sessionStorage.getItem("user")){
      this.userService.viewCart().subscribe(data=>{
        if(data){
       
          this.spinner.show();
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 2000);

          this.cart = data.productList;
          //this.cartCount.emit(this.cart.length);
          //this.totalCounter = this.cart.length;
          let obj = document.getElementById("lblCartCount");//
          if(obj!=null){//
            obj.innerHTML = ""+this.cart.length;//
          }//
          
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
        this.toasterService.warning('Item Aready Added In Cart','Warning')
      }
      else{
        this.userService.addToCart(productId).subscribe(data=>{
          if(data){
          this.toasterService.success('Item SuccessFully Added In Cart','Success')
      
            this.ngOnInit();
          }
        })
      }
    }else 
     this.toasterService.warning('Please Login First','warning')
  }
}