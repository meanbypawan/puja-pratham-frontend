import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  products: any = [];
  totalPrice: number = 0;
  constructor(private userService: UserService,private router:Router) {
    userService.viewCart().subscribe(data => {
      for (let element of data.productList) {
        element.discountedPrice = element.price - (element.price * element.discount / 100) ;
        element.qty = 1;
        this.totalPrice += element.discountedPrice;
      }
      this.products = data.productList;
      sessionStorage.setItem("cartItems", JSON.stringify(data.productList));
    });
  }

  removeFromCart(id: string, index: number) {
    this.userService.removeFromCart(id).subscribe(data => {
      if (data) {
        this.products.splice(index, 1);
        let items = <any[]>JSON.parse(sessionStorage.getItem("cartItems") || "[]");
        items.splice(index, 1);
        this.totalPrice = 0;
        for (let element of items) {
          this.totalPrice = this.totalPrice + element.qty * element.discountedPrice;
        }
        sessionStorage.setItem("cartItems", JSON.stringify(items));
      }
    });
  }

  changeQuantity(event: any, index: number) {
    let items = <any>JSON.parse(sessionStorage.getItem("cartItems") || "[]");
    this.totalPrice = 0;
    items[index].qty = event.target.value;
    for (let element of items) {
      this.totalPrice = this.totalPrice + element.qty * element.discountedPrice;
    }
    sessionStorage.setItem("cartItems", JSON.stringify(items));
    this.products = items;
  }

  ngOnInit(): void {}

  placeOrder(){
    this.router.navigate(["place-order"]);
  }

}
