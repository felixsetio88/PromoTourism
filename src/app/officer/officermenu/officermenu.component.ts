// Importing necessary modules and services
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { ReviewService } from 'src/app/service/review.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-officermenu',
  templateUrl: './officermenu.component.html',
  styleUrls: ['./officermenu.component.css']
})
export class OfficermenuComponent implements OnInit {
  // Initializing variables for current date, user name, and counters
  today: number = Date.now();
  name: string = 'John Doe';
  user: number = 0;
  merchant: number = 0;
  product: number = 0;

  // Injecting required services through the constructor
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private productService: ProductService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    // Decoding JWT token to extract user information
    const decodedToken = this.tokenService.decodeToken();
    
    // Updating user name if the token is valid
    if (decodedToken) {
      this.name = decodedToken.name;
    } else {
      console.log('Token is not valid or not present');
    }
    
    // Initializing counters by fetching data from respective services
    this.getUser();
    this.getMerchant();
    this.getProduct();
  }

  // Fetching the number of users from the authentication service
  getUser() {
    this.authService.getNumberOfUsers().subscribe((res) => {
      this.user = res.data;
    });
  }

  // Fetching the number of merchants from the authentication service
  getMerchant() {
    this.authService.getNumberOfMerchants().subscribe((res) => {
      this.merchant = res.data;
    });
  }

  // Fetching the number of products from the product service
  getProduct() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.product = res.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
