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
    })
  }

  viewDetails(id:any){}

}
