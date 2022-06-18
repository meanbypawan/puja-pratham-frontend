import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ShopGeneralAllComponent } from '../shop-general-all/shop-general-all.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  counter:any = 10;
  @ViewChild(ShopGeneralAllComponent) shopGeneralAllComponent!:ShopGeneralAllComponent;
  
  constructor() { }

  ngOnInit(): void {
  }
 
}
