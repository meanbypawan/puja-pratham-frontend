import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  name:string="";
  email:string = "";
  mobile:string = "";
  address:string = "";
  image:string = "";
  user:any;

  constructor(private userService:UserService,private router:Router,private toasterService:ToastrService) {
    userService.viewOneUser().subscribe(data=>{
      // console.log(data);
      this.user = data;
      this.name = data.name;
      this.address = data.address;
    })

   }

  ngOnInit(): void {
  }
  formData = new FormData();


  editProfile(){
    console.log("called..");
    this.formData.append("name",this.name);
    this.formData.append("address",this.address);
    this.formData.append("oldImage",this.user.image);
    this.formData.append("email",this.user.email);
    this.userService.editProfile(this.formData).subscribe(data=>{
      if(data.user){
        this.userService.viewOneUser().subscribe(data=>{
          let user = {
            id : data._id,
            name : data.name,
            image : data.image
          };
          this.toasterService.success("Profile editted Successfully","Profile Editted");
          sessionStorage.setItem("user",JSON.stringify(user));
          this.router.navigate([""]);
        })
      }
    },err=>{
      if(err instanceof HttpErrorResponse){
        console.log(err);
        this.toasterService.error("Error","Something went Wrong");

      }
    })
  }
  
  selectImage(Events:any){
    if(Events.target.files.length>0){
      this.image = Events.target.files[0];
      console.log(this.image);
     this.formData.append("image",this.image);
    }
  }
  

}
