import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-media-general',
  templateUrl: './media-general.component.html',
  styleUrls: ['./media-general.component.css']
})
export class MediaGeneralComponent implements OnInit {

  videos:any[] = [];
  audios:any[] = [];
  constructor(private service:CategoryService,private spinner:NgxSpinnerService) { 
    service.viewMedia().subscribe(data=>{
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
        else{
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
  ngOnInit(): void {
  }

}
