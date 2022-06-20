import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders:any[]=[];
  constructor(private userService:UserService,
    private spinner:NgxSpinnerService) {}

  ngOnInit(): void {
    this.userService.orderHistory().subscribe(data=>{
      console.log(data);
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
      this.orders = data; 
       this.spinner.show();
   
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      for(let order of this.orders){
        order.date = new Date(order.date).getDate() + " " + months[new Date(order.date).getMonth()] + ", " +  new Date(order.date).getFullYear(); 
      }
      console.log(this.orders[0].date.split("T")[0]);
    })
  }

  viewDetails(id:any){}

  changeStar(number:any){
    // console.log(number);
    let id = number.split(" ")[0];
    let stars = number.split(" ")[1];
    // let filledStar = document.getElementById(number);
    // console.log(filledStar.classList);
    for(let i=1;i<=stars;i++){
      number = id + " " + i;
      console.log(number);
      let filledStar = document.getElementById(number);
      
      filledStar.className = "fa fa-star fa-2x";
    }
    // filledStar.className = "fa fa-star fa-2x";
  }

}
