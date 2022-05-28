import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-ordered-product',
  templateUrl: './ordered-product.component.html',
  styleUrls: ['./ordered-product.component.css']
})
export class OrderedProductComponent implements OnInit {
  id: any;
  products: any;
  ratting: number;
  message: any;
  flag: any = true;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.id = activatedRoute.snapshot.paramMap.get("id");
    this.userId = JSON.parse(sessionStorage.getItem("user") || '{}').id;
    let top = 0;
    userService.viewOrderedProduct(this.id).subscribe(data => {
      console.log(data);
      this.products = data;
      for (let i = 0; i < data.productList.length; i++) {
        for (let j = 0; j < data.productList[i].product.comments.length; j++) {
          if (data.productList[i].product.comments[j].userId == this.userId) {
            top = 1;
            data.productList[i].flag = false;
          }
        }
        if (top == 0) {
          data.productList[i].flag = true;
        }
        top = 0;
      }
    })
  }

  ngOnInit(): void {
  }

  changeStar(number: any) {
    let id = number.split(" ")[0];
    let stars = number.split(" ")[1];
    this.ratting = stars;
    for (let i = 1; i <= stars; i++) {
      number = id + " " + i;
      let filledStar = document.getElementById(number);
      filledStar.className = "fa fa-star fa-2x";
    }
  }
  userId: any;
  message1:any;
  postComment(id: string) {
    let userId = JSON.parse(sessionStorage.getItem("user") || '{}').id;
    this.userId = userId;
    let comment = {
      userId: userId,
      message: this.message,
      productId: id,
      ratting: this.ratting
    }
    this.userService.reviewProduct(comment).subscribe(data => {
      console.log(data);
    })
  }

  viewReview(id: string) {
    let support;
    for(let element of this.products.productList){
      if(element.flag == false){
        for(let el of element.product.comments){
          if(el.userId == this.userId){
            let stars = el.ratting;  
            this.message1 = el.message; 
            console.log(stars);       
            for(let i=1;i<=stars;i++){
              support = document.getElementById(id+"  " + i);      
              support.className = "fa fa-star fa-2x";
            }
          }
        }
      }
      else
        console.log("not found");
    }
  }
}
