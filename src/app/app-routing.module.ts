import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { HomeComponent } from './user/home/home.component';
import { OtpCheckerComponent } from './user/otp-checker/otp-checker.component';
import { SignupComponent } from './user/signup/signup.component';
import {ShopSpecificComponent} from './user/shop-specific/shop-specific.component';
import { ViewMoreComponent } from './user/view-more/view-more.component';

const routes: Routes = [
  {path : "signup" , component:SignupComponent},
  {path : "otp-checker/:id" , component:OtpCheckerComponent},
  
  {path : "" , component:DashboardComponent,children:[
  {path : "" , component:HomeComponent},
  {path:"shops/:id",component:ShopSpecificComponent},
  {path:"viewMore/:id",component:ViewMoreComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
