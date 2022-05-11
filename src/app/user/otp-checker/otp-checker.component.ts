import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-otp-checker',
  templateUrl: './otp-checker.component.html',
  styleUrls: ['./otp-checker.component.css']
})
export class OtpCheckerComponent implements OnInit {
  otp:string="";
  id:string="";
  constructor(private router:Router,private userService:UserService,private activatedRoute:ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot.paramMap.get("id") || "";
  }

  ngOnInit(): void {
  }
  register(){
    
    this.userService.register(this.otp,this.id).subscribe(data=>{
      if(data.message){
        sessionStorage.setItem("token",data.token);
        let user = {
          name:data.user.name,
          image:data.user.image,
          id:data.user._id
        }
        sessionStorage.setItem("user",JSON.stringify(user));
        this.router.navigate([""]);
      }
      else{
        console.log(data);
      }
    },err=>{
      if(err instanceof HttpErrorResponse){
        console.log("hello");
      }
    })
  }

  resendOtp(){
    this.userService.resendOtp(this.id).subscribe(data=>{
      if(data.message)
        console.log("Your new otp has been sent to your entered phone number");
    },err=>{
      console.log(err);
    })
  }

}
