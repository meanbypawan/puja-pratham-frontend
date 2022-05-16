import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {

  ID='';
  product:any;
  points:any[]=[];

  constructor(private prouctService: ProductService, private ActivatedRoute: ActivatedRoute, private router:Router) {
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

  ngOnInit(): void {
  }

}
