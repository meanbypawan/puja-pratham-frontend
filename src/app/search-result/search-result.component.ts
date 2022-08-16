import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  keywords:any;
  products:any[]=[];
  cart:any[]=[];
  constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private route:Router,
    private productService:ProductService,private toasterService:ToastrService,private spinner:NgxSpinnerService) {
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
    if(sessionStorage.getItem("user")){
      this.userService.viewCart().subscribe(data=>{
        if(data){
          this.spinner.show();
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 2000);
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
        // alert("Product is already added to your cart");
        this.toasterService.warning('Item Already Added In Cart','Warning');
      }
      else{
        this.userService.addToCart(productId).subscribe(data=>{
          if(data){
       this.toasterService.success('Item Added SuccessFully','Success')
            this.ngOnInit();
          }
        })
      }
    }else 
   this.toasterService.warning('Please Login First','Warning');
  }
}
