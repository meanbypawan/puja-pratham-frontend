import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-media-specific',
  templateUrl: './media-specific.component.html',
  styleUrls: ['./media-specific.component.css']
})
export class MediaSpecificComponent implements OnInit {
  id:string="";
  videos:any[] = [];
  audios:any[] = [];
  constructor(private router:Router,private service:CategoryService,private activatedRoute:ActivatedRoute,
    private spinner:NgxSpinnerService) { 
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.audios = [];
        this.videos = [];
        this.id = activatedRoute.snapshot.paramMap.get("id");
        console.log(this.id);
        service.viewMediaByCat(this.id).subscribe(data=>{
          console.log(data);
          for(let element of data){
            if(element.type == "audio"){
              this.spinner.show();
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 2000);
              this.audios.push(element);
           
            }
            else if(element.type == "video") {
              this.spinner.show();
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 2000);
            this.videos.push(element);
        
            }
          }
        })
      }
    })
  }
  ngOnInit(): void {
  }
}
