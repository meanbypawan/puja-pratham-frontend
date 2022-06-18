
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { MainPartComponent } from './user/home/main-part/main-part.component';
import { ImgSliderComponent } from './user/home/img-slider/img-slider.component';
import { WhyUsComponent } from './user/home/why-us/why-us.component';
import { HeaderComponent } from './user/header/header.component';
import { NavLinksComponent } from './user/nav-links/nav-links.component';
import { FooterComponent } from './user/footer/footer.component';
import { SignupComponent } from './user/signup/signup.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { OtpCheckerComponent } from './user/otp-checker/otp-checker.component';
import { MediaGeneralComponent } from './user/media-general/media-general.component';
import { MediaSpecificComponent } from './user/media-specific/media-specific.component';
import { TempleSpecificComponent } from './user/temple-specific/temple-specific.component';
import { TemplePujaOneComponent } from './user/temple-puja-one/temple-puja-one.component';
import { MediaOneComponent } from './user/media-one/media-one.component';
import { EventComponent } from './user/event/event.component';
import { EventOneComponent } from './user/event-one/event-one.component';
import { ShopGeneralComponent } from './user/shop-general/shop-general.component';
import { ShopGeneralAllComponent } from './user/shop-general-all/shop-general-all.component';
import { ShopSpecificComponent } from './user/shop-specific/shop-specific.component';
import { ViewMoreComponent } from './user/view-more/view-more.component';
import { SafePipePipe } from './safe-pipe.pipe';
import { BookeventComponent } from './user/bookevent/bookevent.component';

// Datepicker module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';

//timepicker


import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';

import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { OrderComponent } from './user/order/order.component';
import { PlaceOrderComponent } from './user/place-order/place-order.component';
import { OrderHistoryComponent } from './user/order-history/order-history.component';
import { GoogleLoginProvider,SocialAuthServiceConfig,SocialLoginModule } from 'angularx-social-login';
import { BookTemplePoojaComponent } from './user/book-temple-pooja/book-temple-pooja.component';
import { CacheInterceptorService } from './interceptor/cache-interceptor.service';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';
import { OrderedProductComponent } from './user/ordered-product/ordered-product.component';
import { AboutUsComponent } from './user/about-us/about-us.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
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
    MediaGeneralComponent,
    MediaSpecificComponent,
    TempleSpecificComponent,
    TemplePujaOneComponent,
    MediaOneComponent,
    EventComponent,
    EventOneComponent,
    ShopGeneralComponent,
    ShopGeneralAllComponent,
    ShopSpecificComponent,
    ViewMoreComponent,
    SafePipePipe,
    BookeventComponent,
    EditProfileComponent,
    SearchResultComponent,
    OrderComponent,
    PlaceOrderComponent,
    OrderHistoryComponent,
    BookTemplePoojaComponent,
    OrderedProductComponent,
    AboutUsComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    NgxMatTimepickerModule,
    SocialLoginModule,
    ToastrModule.forRoot()

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
               '1027856516784-u5ja0r356f4uksto7mnmp9hhpbcmgnd1.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    // {
    //   useClass: CacheInterceptorService,
    //   provide: HTTP_INTERCEPTORS,
    //   multi: true
    // },
    {
      useClass: TokenInterceptorService,
      provide: HTTP_INTERCEPTORS,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
