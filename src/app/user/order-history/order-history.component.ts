import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders:any[]=[];
  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.userService.orderHistory().subscribe(data=>{
      this.orders = data;
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      for(let order of this.orders){
        order.date = new Date(order.date).getDate() + " " + months[new Date(order.date).getMonth()] + ", " +  new Date(order.date).getFullYear(); 
      }
      console.log(this.orders[0].date.split("T")[0]);
    })
  }

  viewDetails(id:any){}

}
