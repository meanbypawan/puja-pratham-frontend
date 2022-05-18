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
  audiomediaList:any[]=[];
  videomediaList:any[]=[];
  audio="audio";
  video="video";
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
      // console.log(this.type);
      // this.mediaList = data;    
      // console.log(data.type+"hiii"); 
      // console.log(data);
      for(let element of data){
        if(element.type=="audio")
          this.audiomediaList.push(element);
          
        else if(element.type == "video")
          this.videomediaList.push(element);
        console.log(element.type);
      }
      
    })
  }
  ngOnInit(): void {}
}
