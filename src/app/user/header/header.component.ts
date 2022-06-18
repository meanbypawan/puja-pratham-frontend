import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
declare var webkitSpeechRecognition:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('myCounter') myCounter: ElementRef;
  // @Output() dataEvent = new EventEmitter<any>();
  @Input() dataCounter:any;
  count:any;
  user!: SocialUser;
  email: string = "";
  password: string = "";
  userProfile: any;
  panditProfile: any;
  cartList: any[] = [];
  search:any; 

  // public sendValue(){
    
  // }

  constructor(private toasterService:ToastrService,private authService: SocialAuthService,private userService:UserService,private productService:ProductService,private router:Router) {
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
        console.log(this.search);
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
    if(sessionStorage.getItem("user")){
      this.totalPrice = 0;
      this.userService.viewCart().subscribe(data=>{
        if(data){
          this.cartList = data.productList;
          this.count = this.cartList.length;
          this.myCounter.nativeElement.innerHTML = this.count;
          for(let element of this.cartList){
            element.discountedPrice = element.price - (element.price * element.discount / 100) ;
            this.totalPrice += element.discountedPrice;
          }
        }
      })
    } 
  }
  checkCart() {
    if (this.cartList.length > 0)
      return true;
    return false;
  }
  ngOnInit(): void {
    this.authService.authState.subscribe((data: any) => {
      this.user = data;
      this.userService.socialLogin(this.user).subscribe(data => {
        let user = {
          name:data.user.name,
          image:data.user.image,
          id:data.user._id,
          flag:false
        }
        this.toasterService.success('You have been login sucessfully!', 'Success');
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
      });
    });
  }

  removeFormCart(pid: string) {
    this.userService.removeFromCart(pid).subscribe(data => {
      this.viewCartProduct();
    })
  }

  socialLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
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
    // let nav: any = document.querySelector('#nav');
    let cart: any = document.querySelector('#cart');
    let login: any = document.querySelector('#login');
    let search: any = document.querySelector('#search');

    closer.style.display = 'none';
    // nav.classList.remove('active');
    cart.classList.remove('active');
    login.classList.remove('active');
  }
  searchBtn(search: any) {
    search.classList.toggle('active');
    console.log("active")
  }

   loginAsUser (){
    this.userService.login(this.email,this.password).subscribe(data => {
      if(!data.error){
        let user = {
          name:data.user.name,
          image:data.user.image,
          id:data.user._id,
          flag:true
        }
        this.toasterService.success('You have been login sucessfully!', 'Success');
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
