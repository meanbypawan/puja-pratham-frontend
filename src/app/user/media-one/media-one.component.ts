import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-media-one',
  templateUrl: './media-one.component.html',
  styleUrls: ['./media-one.component.css']
})
export class MediaOneComponent implements OnInit {
  id:string="";
  media:any;
  link:string="";
  lyrics:any;
  constructor(private router:Router,private service:CategoryService,private activatedRoute:ActivatedRoute) {
      router.events.subscribe(event=>{
        if(event instanceof NavigationEnd){
          this.id = activatedRoute.snapshot.paramMap.get("id");
          service.viewOneMedia(this.id).subscribe(data=>{
            console.log(data);
            this.media = data;
            this.link = data.link;
            this.lyrics = data.lyrics.split("\n\n");
          })
        }
      })
  }
  ngOnInit(): void {
  }

}
