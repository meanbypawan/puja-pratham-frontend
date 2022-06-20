import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-temple-specific',
  templateUrl: './temple-specific.component.html',
  styleUrls: ['./temple-specific.component.css']
})
export class TempleSpecificComponent implements OnInit {
  id:string="";
  templePojaas:any=[];
  constructor(private service:CategoryService,private router:Router,
    private activatedRoute:ActivatedRoute,private spinner:NgxSpinnerService) {
    router.events.subscribe(async event=>{
      if(event instanceof NavigationEnd){
        this.id = await activatedRoute.snapshot.paramMap.get("id");
        console.log(this.id);
        service.viewTempleByCategory(this.id).subscribe(data=>{
          // console.log(data);
          this.spinner.show();
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 2000);
          
          this.templePojaas = data;
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
