import { Component, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
// it will be called later. See header.component.html
isScrolled:boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10; // Change the scroll threshold as needed
  }
logoImage: any;
logoSquare: any;
urlLogo: any;
isSearchBarEnable: boolean;
isCartEnable: boolean;
isShown: boolean;
userData: any;

constructor(
  private router: Router,
  private authService: AuthService,
  private tokenService: TokenService
) {
  this.logoImage = '/assets/img/logo-landscape.png';
  this.logoSquare = 'assets/img/favicon.png';
  this.urlLogo = '';
  this.isSearchBarEnable = false;
  this.isCartEnable = false;
  this.isShown = false;
}
ngOnInit(): void {
  this.getUserData();
}

getUserData() {
  const decodedToken = this.tokenService.decodeToken();
  if (decodedToken) {
    this.userData = decodedToken;
  } else {
    console.log('Token is not valid or not present');
  }
}

//Redirect to login page using router.
goToLogin() {
  this.router.navigate(['auth/login']);
}
//Redirect to register page using router.
goToRegister() {
  this.router.navigate(['auth/register']);
}

onLogout() {
  try {
    this.authService.logoutUser();

    this.router.navigateByUrl('/');
    window.location.reload();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Unexpected error!',
    });
  }
}

//Built-in check to toggle the mobile navbar.

toggleMobileNav() {
  this.isShown = !this.isShown;
}
}

