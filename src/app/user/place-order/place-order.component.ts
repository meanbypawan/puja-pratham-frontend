import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
declare let Razorpay: any;

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  contact: any;
  address: any;
  products: any[];
  amount: number = 0;
  productList: any[] = [];
  user: any;

  constructor(private userService: UserService, private router: Router,private toasterService:ToastrService) {
    this.products = JSON.parse(sessionStorage.getItem("cartItems") || "[]");
    for (let i = 0; i < this.products.length; i++) {
      let item = { product: this.products[i]._id, totalPrice: this.products[i].discountedPrice, qty: this.products[i].qty };
      this.productList.push(item);
      this.amount = this.amount + this.products[i].discountedPrice;
    }
    this.user = JSON.parse(sessionStorage.getItem("user") || "{}");
  }

  ngOnInit(): void {
  }

  order() {
    if (this.mode == 1) {
      let order = {
        productList: this.productList,
        mobile: this.contact,
        address: this.address,
        amount: this.amount,
      }
      this.userService.placeOrder(order).subscribe(data => {
        if (data) {
          this.userService.deletecart().subscribe(data => {
            this.router.navigate([""]);
            this.toasterService.success('Order Placed Succesfully','Success')
          
          });
        }
      });
    } else if (this.mode == 2) {
      this.userService.createOrder().subscribe(data => {
        var options = {
          "key": "rzp_test_NPr7p2g2REFz6n", // Enter the Key ID generated from the Dashboard
          "amount": '100', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Acme Corp",
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          // "callback_url": "https://worship-first-by-tech-priest.herokuapp.com/order/order-status",
          "prefill": {
            "name": this.user.email,
            "email": "mahak01agrawal@gmail.com",
            "contact": this.contact
          },
          handler: (response: {
            razorpay_payment_id: any;
            razorpay_order_id: any;
            razorpay_signature: any;
          }) => {
            let userId = JSON.parse(sessionStorage.getItem("user") || "{}").id;
            console.log("handler " + JSON.stringify(response));
            let order = {
              productList: this.productList,
              mobile: this.contact,
              address: this.address,
              amount: this.amount,
              response:response,
              userId : userId
            }
            this.userService.placeOrder2(order).subscribe((data) => {
              if(data.message == "Pay success"){
                this.userService.deletecart().subscribe(data=>{
                  this.router.navigate(['']);
                  this.toasterService.success('Order Placed Succesfully','Success')
                })
              }
              else{
                this.toasterService.error('Order Failed..','Error')
              }
            });
          },
          "notes": {
            "address": "Razorpay Corporate Office"
          },
          "theme": {
            "color": "#3399cc"
          }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();

        // this.userService.deletecart().subscribe(data => {
        //   console.log("cart deleted");
        // })
      });

    }
  }
  mode: any;
  change(event: any) {
    this.mode = event.target.value;
  }
}