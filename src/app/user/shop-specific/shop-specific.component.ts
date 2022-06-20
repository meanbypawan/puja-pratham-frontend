import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from "ngx-spinner";

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

  constructor(private toasterService:ToastrService,private userService:UserService, private productService:ProductService,
     private ActivatedRoute:ActivatedRoute, private router:Router,private spinner:NgxSpinnerService ) { 
   this.router.events.subscribe(event=>{
     this.catid   =  <string>this.ActivatedRoute.snapshot.paramMap.get("id");
     if(event instanceof NavigationEnd){
       this.productService.productViewbyCategoryId(this.catid).subscribe(data=>{
          for(let element of data){
            element.discountedPrice = element.price - (element.price * element.discount / 100);
          }
        
         this.spinner.show();
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 2000);

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
        this.toasterService.warning('Item Already Added In Cart','Warning');
      }
      else{
        this.userService.addToCart(productId).subscribe(data=>{
          if(data){
           this.toasterService.success('Item Added In Cart','Success');
            this.ngOnInit();
          }
        })
      }
    }else 
     this.toasterService.warning('Please Login First','Warning');
  }

}
