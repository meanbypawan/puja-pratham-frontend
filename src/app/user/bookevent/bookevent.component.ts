import { Component, OnInit } from '@angular/core';
// import {  HostListener, ViewChild } from '@angular/core';
// import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
// import { componentFactoryName } from '@angular/compiler';
@Component({
  selector: 'app-bookevent',
  templateUrl: './bookevent.component.html',
  styleUrls: ['./bookevent.component.css']
})
export class BookeventComponent implements OnInit {
  startTime: any;
  endTime: any;
  minDate: Date;
  maxDate: Date;
  constructor() {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate()+2);
    this.maxDate.setDate(this.maxDate.getDate()+30);
  }

  ngOnInit(): void {
  }
}
