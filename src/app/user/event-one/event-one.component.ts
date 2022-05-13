import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-event-one',
  templateUrl: './event-one.component.html',
  styleUrls: ['./event-one.component.css']
})
export class EventOneComponent implements OnInit {
  id:string="";
  event:any; 
  constructor(private activatedRoute:ActivatedRoute,private service:CategoryService) {
    this.id = activatedRoute.snapshot.paramMap.get("id");
    service.viewOneEvent(this.id).subscribe(data=>{
      this.event = data;
    })
    
  }
  ngOnInit(): void {
  }
}
