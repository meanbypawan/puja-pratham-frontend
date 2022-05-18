import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
declare var webkitSpeechRecognition:any;

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
  search:any; 
  
  constructor(private userService:UserService,private productService:ProductService,private router:Router) {
    this.viewCartProduct();
  }

  searching(){
    if("webkitSpeechRecognition" in window){
      let audio = new Audio();
      audio.src =  "../../../assets/audios/mic2.mp3";
      audio.load();
      audio.play();
      let vSearch = new webkitSpeechRecognition();
      vSearch.lang = "en-US";
      vSearch.start();

      vSearch.onresult = async (e:any) =>{
        this.search = await e.results[0][0].transcript;
        vSearch.stop();
        this.router.navigate(["search",this.search]).then(()=>{
          location.reload();
        })
      }
      vSearch.onerror = function(e:any){
        console.log(e);
        vSearch.stop();
      }
    }
    else{
      console.log("Your browser dosen't support speech recognition");
    }
  }
  totalPrice?: number = 0;
  viewCartProduct() {
    this.totalPrice = 0;
    this.userService.viewCart().subscribe(data=>{
      if(data){
        this.cartList = data.productList;
        for(let element of this.cartList){
          element.discountedPrice = element.price - (element.price * element.discount / 100) ;
          this.totalPrice += element.discountedPrice;
        }
      }
    })
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
    if (sessionStorage.getItem("user"))
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
    let val = event.target.value;
    this.router.navigate(["search", val]);
  }

  checkout() {
    this.router.navigate(["order"]);
  }

  forgetPassword(){
    
  }
  
  
}
