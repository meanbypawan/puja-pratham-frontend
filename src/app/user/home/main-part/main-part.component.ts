import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-main-part',
  templateUrl: './main-part.component.html',
  styleUrls: ['./main-part.component.css']
})
export class MainPartComponent implements OnInit {

  productList: any[] = [];
  packageList: any[] = [];
  mediaList:any[]=[];
  constructor(private categoryService:CategoryService) {
    
    categoryService.view().subscribe(data=>{
      for(let element of data){
        if(element.type=="product")
          this.productList.push(element);
        else if(element.type == "package")
          this.packageList.push(element);
      }
    });
    categoryService.viewMedia().subscribe(data=>{
      if(data){
        this.mediaList = data;
          console.log(this.mediaList)
        }
    })
  }
  ngOnInit(): void {}
}
