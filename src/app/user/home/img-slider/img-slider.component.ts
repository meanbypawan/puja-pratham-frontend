import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.css']
})
export class ImgSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  index = 0;
  next() {
    let slides = document.querySelectorAll('.home .slides-container .slide');

    slides[this.index].classList.remove('active');
    this.index = (this.index + 1) % slides.length;
    slides[this.index].classList.add('active');
  }

  prev() {
    let slides = document.querySelectorAll('.home .slides-container .slide');

    slides[this.index].classList.remove('active');
    this.index = (this.index - 1 + slides.length) % slides.length;
    slides[this.index].classList.add('active');
  }
}
