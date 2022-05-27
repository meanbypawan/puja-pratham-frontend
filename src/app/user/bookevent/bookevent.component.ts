import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
declare let Razorpay: any;

@Component({
  selector: 'app-bookevent',
  templateUrl: './bookevent.component.html',
  styleUrls: ['./bookevent.component.css']
})
export class BookeventComponent implements OnInit {
  time:any;
  mode:any;
  address:any;
  date:any;
  contact:any;
  startTime: any;
  minDate: Date;
  maxDate: Date;
  id:string;
  event:any;
  constructor(private tostarService:ToastrService,private router:Router,private activatedRoute:ActivatedRoute,private cateService:CategoryService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate()+2);
    this.maxDate.setDate(this.maxDate.getDate()+30);
    this.id = activatedRoute.snapshot.paramMap.get("id");
    cateService.viewOneEvent(this.id).subscribe(data=>{
      this.event = data;
      console.log(this.event);
    })
  }

  bookEvent(){
    if(sessionStorage.getItem("user")){
      let userId=JSON.parse(sessionStorage.getItem("user")||"{}").id;
    let order={
      userId:userId,
      mobile_no:this.contact,
      address:this.address,
      booking_date:this.date,
      start_time:this.startTime,
      amount:this.event.price,
      event:this.id
   }
    if(this.mode==1){
      this.cateService.bookEventOnCash(order).subscribe(data=>{
        console.log(data);
        this.router.navigate([""]);
      })
    }
    else if(this.mode == 2){
      this.cateService.createEvent().subscribe(data=>{
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
            "name": "Faizan Lala",
            "email": "faizan@gmail.com",
            "contact": this.contact
          },
          handler: (response: {
            razorpay_payment_id: any;
            razorpay_order_id: any;
            razorpay_signature: any;
          }) => {
            let order={
              userId:userId,
              mobile_no:this.contact,
              address:this.address,
              booking_date:this.date,
              start_time:this.startTime,
              amount:this.event.price,
              event:this.id,
              response:response
           }
            this.cateService.bookEventOnline(order).subscribe((data) => {
              if(data.message == "Pay success"){
                console.log(data.order);  
                this.router.navigate(['']);
                this.router.events.subscribe(event=>{
                  if(event instanceof NavigationEnd){
                    location.reload();
                  }
                })
              }
              else{
                console.log(data);
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
      })
    }
    else{
      this.tostarService.warning("Please select the payment mode","Payment Type Not Found");
    }
    }
    else{
      this.tostarService.error("Please Login First","Login Failed");
    }
  }

  onlinePayment(event:any){
      this.mode=event.target.value;
     
  }
  ngOnInit(): void {
  }
}
