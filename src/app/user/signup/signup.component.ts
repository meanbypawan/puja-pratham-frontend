import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name:string="";
  email:string = "";
  mobile:string = "";
  address:string = "";
  image:string = "";

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  sendOtp(){
    let formData = new FormData();
    formData.append("name",this.name);
    formData.append("email",this.email);
    formData.append("mobile",this.mobile);
    formData.append("address",this.address);
    formData.append("image",this.image);
    this.userService.sentOtp(formData).subscribe(data=>{
      if(data.user){
        this.router.navigate(["otp-checker",data.user._id]);
      }
    },err=>{
      if(err instanceof HttpErrorResponse){
        console.log(err);
      }
    })
  }

  selectImage(Events:any){
    if(Events.target.files.length>0){
      this.image = Events.target.files[0];
      console.log(this.image);
    }
  }
}