import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { HomeComponent } from './user/home/home.component';
import { OtpCheckerComponent } from './user/otp-checker/otp-checker.component';
import { ShopGeneralAllComponent } from './user/shop-general-all/shop-general-all.component';
import { ShopGeneralComponent } from './user/shop-general/shop-general.component';
import { SignupComponent } from './user/signup/signup.component';

const routes: Routes = [
  {path : "signup" , component:SignupComponent},
  {path : "otp-checker/:id" , component:OtpCheckerComponent},
  
  {path : "" , component:DashboardComponent,children:[
  {path : "" , component:HomeComponent},
  {path :"shop-general", component:ShopGeneralComponent},
  {path :"shop-general-all/:type",component:ShopGeneralAllComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
