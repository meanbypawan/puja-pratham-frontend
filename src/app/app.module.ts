import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { MainPartComponent } from './user/home/main-part/main-part.component';
import { ImgSliderComponent } from './user/home/img-slider/img-slider.component';
import { WhyUsComponent } from './user/home/why-us/why-us.component';
import { HeaderComponent } from './user/header/header.component';
import { NavLinksComponent } from './user/nav-links/nav-links.component';
import { FooterComponent } from './user/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './user/signup/signup.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { HttpClientModule} from "@angular/common/http";
import { OtpCheckerComponent } from './user/otp-checker/otp-checker.component';
import { ShopGeneralComponent } from './user/shop-general/shop-general.component';
import { ShopGeneralAllComponent } from './user/shop-general-all/shop-general-all.component';


import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainPartComponent,
    ImgSliderComponent,
    WhyUsComponent,
    HeaderComponent,
    NavLinksComponent,
    FooterComponent,
    SignupComponent,
    DashboardComponent,
    OtpCheckerComponent,
    ShopGeneralComponent,
    ShopGeneralAllComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
