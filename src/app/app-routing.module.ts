import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { EventOneComponent } from './user/event-one/event-one.component';
import { EventComponent } from './user/event/event.component';
import { HomeComponent } from './user/home/home.component';
import { MediaGeneralComponent } from './user/media-general/media-general.component';
import { MediaOneComponent } from './user/media-one/media-one.component';
import { MediaSpecificComponent } from './user/media-specific/media-specific.component';
import { OtpCheckerComponent } from './user/otp-checker/otp-checker.component';
import { ShopGeneralAllComponent } from './user/shop-general-all/shop-general-all.component';
import { ShopGeneralComponent } from './user/shop-general/shop-general.component';
import { SignupComponent } from './user/signup/signup.component';
import { TemplePujaOneComponent } from './user/temple-puja-one/temple-puja-one.component';
import { TempleSpecificComponent } from './user/temple-specific/temple-specific.component';
import {ShopSpecificComponent} from './user/shop-specific/shop-specific.component';
import { ViewMoreComponent } from './user/view-more/view-more.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { OrderComponent } from './user/order/order.component';
import { PlaceOrderComponent } from './user/place-order/place-order.component';

const routes: Routes = [
  {path : "signup" , component:SignupComponent},
  {path : "otp-checker/:id" , component:OtpCheckerComponent},
  {path : "edit-profile/:id",component:EditProfileComponent},
  {path:"place-order",component:PlaceOrderComponent},
  
  {path : "" , component:DashboardComponent,children:[
  {path : "" , component:HomeComponent},
  {path:"media", component:MediaGeneralComponent},
  {path:"medias/:id",component:MediaSpecificComponent},
  {path:"temples/:id",component:TempleSpecificComponent},
  {path:"templePujaOne/:id",component:TemplePujaOneComponent},
  {path : "media-one/:id",component:MediaOneComponent},
  {path:"event/:id",component:EventComponent},
  {path:"event-one/:id",component:EventOneComponent},
  {path :"shop-general", component:ShopGeneralComponent},
  {path :"shop-general-all/:type",component:ShopGeneralAllComponent},
  {path:"shops/:id",component:ShopSpecificComponent},
  {path:"viewMore/:id",component:ViewMoreComponent},
  {path:"search/:keywords",component:SearchResultComponent},
  {path:"order",component:OrderComponent},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
