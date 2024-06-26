import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/service/analysis.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { ReviewService } from 'src/app/service/review.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-merchantmenu',
  templateUrl: './merchantmenu.component.html',
  styleUrls: ['./merchantmenu.component.css']
})
export class MerchantmenuComponent {
//date and time now
today: number = Date.now();
name: string = 'John Doe';
averageMerchantRate: number = 0;
order: number = 0;
product: number = 0;
transaction: number = 0;

constructor(
  private tokenService: TokenService,
  private reviewService: ReviewService,
  private productService: ProductService,
  private orderService: OrderService,
  private analyticsService: AnalyticsService
) {}

ngOnInit() {
  const decodedToken = this.tokenService.decodeToken();
  if (decodedToken) {
    this.name = decodedToken.name;
  } else {
    console.error('Token is not valid or not present');
  }
  this.getAverageMerchantRate(decodedToken.id);
  this.getProduct(decodedToken.id);
  this.getOrder(decodedToken.id);
  this.getTransaction(decodedToken.id);
}

// method to get total product based on merchant
getProduct(id: string) {
  this.productService.getProductsByMerchantId(id).subscribe({
    next: (res) => {
      this.product = res.length;
    },
    error: (err) => {
      console.error(err);
    },
  });
}

// method to get total order based on merchant
getOrder(id: string) {
  this.orderService.getOrderByMerchantId(id).subscribe({
    next: (res) => {
      this.order = res.data.length;
    },
    error: (err) => {
      console.error(err);
    },
  });
}

// method to get overall merchant rating
getAverageMerchantRate(mid: string) {
  this.reviewService.getMerchantAverage(mid).subscribe({
    next: (res) => {
      this.averageMerchantRate = Math.round(res.data);
    },
    error: (err) => {
      console.error(err);
    },
  });
}

// method to get total transaction by merchant id
getTransaction(id: string) {
  this.analyticsService.getTotalTransaction(id).subscribe({
    next: (res) => {
      this.transaction = res.data;
    },
    error: (err) => {
      console.error(err);
    },
  });
}
}

