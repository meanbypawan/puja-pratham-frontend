import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-shop-specific',
  templateUrl: './shop-specific.component.html',
  styleUrls: ['./shop-specific.component.css']
})
export class ShopSpecificComponent implements OnInit {
 catid='';
 products:any[]=[];


  constructor( private productService:ProductService, private ActivatedRoute:ActivatedRoute, private router:Router, ) { 
   this.router.events.subscribe(event=>{
     this.catid   =  <string>this.ActivatedRoute.snapshot.paramMap.get("id");
     if(event instanceof NavigationEnd){
       this.productService.productViewbyCategoryId(this.catid).subscribe(data=>{
         this.products = data;
       })
     }
   })

  }
  ngOnInit(): void {
  }

}
