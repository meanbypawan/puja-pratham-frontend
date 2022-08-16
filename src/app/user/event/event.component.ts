import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  id:string="";
  events:any[]=[];
  constructor(private service:CategoryService,private router:Router,private activatedRoute:ActivatedRoute,private spinner:NgxSpinnerService) {
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.id = activatedRoute.snapshot.paramMap.get("id");
        service.viewEventByCategory(this.id).subscribe(data=>{
          console.log(data);
          this.spinner.show();
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 2000);
          this.events = data;
         
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
