import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-media-general',
  templateUrl: './media-general.component.html',
  styleUrls: ['./media-general.component.css']
})
export class MediaGeneralComponent implements OnInit {

  videos:any[] = [];
  audios:any[] = [];
  constructor(private service:CategoryService) { 
    service.viewMedia().subscribe(data=>{
      console.log(data);
      for(let element of data){
        if(element.type == "audio")
          this.audios.push(element);
        else
          this.videos.push(element);
      }
    })
  }
  ngOnInit(): void {
  }

}
