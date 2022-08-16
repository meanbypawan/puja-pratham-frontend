import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-temple-puja-one',
  templateUrl: './temple-puja-one.component.html',
  styleUrls: ['./temple-puja-one.component.css']
})
export class TemplePujaOneComponent implements OnInit {
id:string="";
templePuja:any;
  constructor(private service:CategoryService,private activatedRoute:ActivatedRoute) {
    this.id = activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);
    service.viewOneTemplePuja(this.id).subscribe(data=>{
      console.log(data);
      this.templePuja = data;
    })
   }

  ngOnInit(): void {
  }

}
