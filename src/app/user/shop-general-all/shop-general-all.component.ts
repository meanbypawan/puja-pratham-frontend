import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopServiceService } from 'src/app/service/shop-service.service';
@Component({
  selector: 'app-shop-general-all',
  templateUrl: './shop-general-all.component.html',
  styleUrls: ['./shop-general-all.component.css']
})
export class ShopGeneralAllComponent implements OnInit {
   typeList:any[]=[];
  p: number = 1;
  total: number = 0;
   type:any;
  constructor(private shopService: ShopServiceService,private activatedRoute:ActivatedRoute) {
    this.type = activatedRoute.snapshot.paramMap.get("type");
    console.log(this.type)
    this.shopService.ViewProduct().subscribe(data => {
      if (data) {
        // console.log(data);
        for (let element of data) {
          if (element.catId.type == this.type)
            this.typeList.push(element);
          // else if (element.catId.type == "package")
          //   this.packageList.push(element);
          // else if (element.catId.type == "photo")
          //   this.photoFrameList.push(element);
          // else
          //   this.murtiList.push(element);

        }
      }
      else
        alert('Something went wrong')
    })

  }


  ngOnInit(): void {
  }

pageChangeEvent(event: number){
    this.p = event;
    this.typeList;
}
}