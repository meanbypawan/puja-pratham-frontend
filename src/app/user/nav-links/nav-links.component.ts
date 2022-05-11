import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.css']
})
export class NavLinksComponent implements OnInit {
  mediaCategories: any = [];
  photoframes: any = [];
  constructor(private category: CategoryService) {
    category.view().subscribe(data => {
      for (let element of data) {
        if (element.type == "product") {
          this.product.push(element);
        }
        else if (element.type == "package") {
          this.package.push(element);
        }
        else if (element.type == "Murti") {
          this.murtis.push(element);
        }
        else if (element.type == "photo") {
          this.photoFrames.push(element);
        }
      }
    });
    category.viewMediaCategories().subscribe(data=>{
      this.mediaCategories = data;
    });   
  }
  package: any[] = [];
  murtis: any[] = [];
  photoFrames: any[] = [];
  product: any[] = [];
  puja:any[]=[];
  orchestra:any[]=[];
  ngOnInit() { }
}
