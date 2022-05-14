import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // user!: SocialUser;
  email: string = "";
  password: string = "";
  userProfile: any;
  panditProfile: any;
  cartList: any[] = [];
  constructor(private userService:UserService) {
    // let login = <HTMLDivElement>document.querySelector("#login");
    // let closer: any = document.querySelector('#closer');
    // closer.style.display = 'block';
    // login.classList.toggle('active');
  }
  totalPrice?: number = 0;
  viewCartProduct() {
    // this.cartService.viewCart().subscribe(data => {
    //   if (data) {
    //     this.cartList = data.productList;
    //     this.totalPrice = 0;
    //     for (let element of this.cartList) {
    //       this.totalPrice += element.price;
    //     }
    //   }
    // });
  }
  checkCart() {
    if (this.cartList.length > 0)
      return true;
    return false;
  }
  ngOnInit(): void {
    // this.authService.authState.subscribe((data: any) => {
    //   this.user = data;
    //   this.userService.socialLogin(this.user).subscribe(data => {
    //     this.userProfile = data;
    //     localStorage.setItem("token", data.token);
    //     localStorage.setItem("user", JSON.stringify(data.user));
    //   });
    // });
  }

  removeFormCart(pid: string) {
    // this.cartService.removeFromCart(pid).subscribe(data => {
    //   this.viewCartProduct();
    // })
  }

  socialLogin() {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() {
    // localStorage.removeItem("token");
    // this.authService.signOut();
  }

  navLinks(nav: any) {
    let closer: any = document.querySelector('#closer');
    closer.style.display = 'block';
    nav.classList.toggle('active');
  }
  showCart(cart: any) {
    let closer: any = document.querySelector('#closer');
    closer.style.display = 'block';
    cart.classList.toggle('active');
    if (localStorage.getItem("user"))
      this.viewCartProduct();
  }
  showLogin(login: any) {
    let closer: any = document.querySelector('#closer');
    closer.style.display = 'block';
    login.classList.toggle('active');
  }

  closeBar() {
    let closer: any = document.querySelector('#closer');
    let nav: any = document.querySelector('#nav');
    let cart: any = document.querySelector('#cart');
    let login: any = document.querySelector('#login');
    let search: any = document.querySelector('#search');

    closer.style.display = 'none';
    nav.classList.remove('active');
    cart.classList.remove('active');
    login.classList.remove('active');
    // search.classList.remove('active');

  }
  searchBtn(search: any) {
    search.classList.toggle('active');
  }

   loginAsUser (){
    this.userService.login(this.email,this.password).subscribe(data => {
      if(!data.error){
        let user = {
          name:data.user.name,
          image:data.user.image,
          id:data.user._id
        }
        // console.log(data);
        this.userProfile = user;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem('token', data.token);
        let audio1 = new Audio();
        audio1.src = "../../../assets/audios/login(hindi).mp3";
        audio1.load();
        audio1.play();
        audio1.onended = ()=>{
          let audio2 = new Audio();
          audio2.src = "../../../assets/audios/login(english).mp3";
          audio2.load();
          audio2.play();
        }
      }
      else{
        console.log(data+"kjf");
      }
      
      
    });
  }

  loginAsPandit() {
    // this.priest.priestLogin(this.email, this.password).subscribe((data) => {
    //   if (data.status == "success") {
    //     localStorage.setItem('token', data.token);
    //     this.router.navigate(['priest'])
    //   };
    // });
  }

  userIsLoggedIn() {
    if (sessionStorage.getItem("token")) {
      this.userProfile = JSON.parse(sessionStorage.getItem("user")|| "{}");
      return true;
    }
    return false;
  }

  signout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem("user");
  }

  words: string = "";
  searchProduct(event: any) {
    // let val = event.target.value;
    // this.router.navigate(["shops", val]);
  }

  checkout() {
    // this.router.navigate(["place-order"]);
  }

  forgetPassword(){
    
  }
}
