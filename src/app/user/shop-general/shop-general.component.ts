import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/service/shop-service.service';
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

  constructor(private shopService: ShopServiceService) {
    console.log("hello");
    this.shopService.ViewProduct().subscribe(data => {
      if (data) {
        console.log(data);
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


  ngOnInit(): void {
  }

}
