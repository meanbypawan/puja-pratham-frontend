import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-media-specific',
  templateUrl: './media-specific.component.html',
  styleUrls: ['./media-specific.component.css']
})
export class MediaSpecificComponent implements OnInit {
  id:string="";
  videos:any[] = [];
  audios:any[] = [];
  constructor(private router:Router,private service:CategoryService,private activatedRoute:ActivatedRoute) { 
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.audios = [];
        this.videos = [];
        this.id = activatedRoute.snapshot.paramMap.get("id");
        console.log(this.id);
        service.viewMediaByCat(this.id).subscribe(data=>{
          console.log(data);
          for(let element of data){
            if(element.type == "audio")
              this.audios.push(element);
            else  
              this.videos.push(element);
          }
        })
      }
    })
  }
  ngOnInit(): void {
  }
}
