import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';
declare let Razorpay: any;

@Component({
  selector: 'app-book-temple-pooja',
  templateUrl: './book-temple-pooja.component.html',
  styleUrls: ['./book-temple-pooja.component.css']
})
export class BookTemplePoojaComponent implements OnInit {
  id:any;
  name:string;
  mobile:string;
  comeStatus:any;
  templePooja:any;
  constructor(private toasterService:ToastrService,private router:Router,private userService : UserService,private activatedRoute:ActivatedRoute,private categoryService:CategoryService) {
    this.id = activatedRoute.snapshot.paramMap.get("id");
    categoryService.viewOneTemplePuja(this.id).subscribe(data=>{
      this.templePooja = data;
      console.log(data)
;    })
  }
  bookNow(){
    if(sessionStorage.getItem("user")){
      if(this.comeStatus==1 || this.comeStatus==2){
        let userId=JSON.parse(sessionStorage.getItem("user")||"{}").id;
      
        this.userService.createTemplePooja().subscribe(data=>{
          var options = {
            "key": "rzp_test_NPr7p2g2REFz6n", 
            "amount": '100',
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": data.id, 
            "prefill": {
              "name": "Faizan Lala",
              "email": "faizan@gmail.com",
              "contact": this.mobile
            },
            handler: (response: {
              razorpay_payment_id: any;
              razorpay_order_id: any;
              razorpay_signature: any;
            }) => {
              let order={
                userId:userId,
                mobile:this.mobile,
                amount:this.templePooja.price,
                templePooja:this.id,
                response:response,
                comeStatus : this.comeStatus,
                beneficiary_name : this.name
             }
              this.userService.placeTemplePooja(order).subscribe((data) => {
                if(data.message == "Pay success"){
                  console.log(data.order);  
                  this.router.navigate(['']);
                  this.router.events.subscribe(event=>{
                    if(event instanceof NavigationEnd){
                      this.toasterService.success("Ordered","Yor order have been sucessfully")
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
        this.toasterService.warning("Please fill the column of come or not","Will You Come")
      }
    }
    else{
      this.toasterService.error("Please Login First","Login Failed");
    }
  }
  ngOnInit(): void {
  }
  changeStatus(event:any){
    this.comeStatus = event.target.value;
  }
}
