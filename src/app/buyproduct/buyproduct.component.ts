import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buyproduct',
  templateUrl: './buyproduct.component.html',
  styleUrls: ['./buyproduct.component.css']
})
export class BuyproductComponent implements OnInit{
  //initialization of variable
  productTitle: string = '';
  product: any;
  order: any = {};
  user: any = {};
  receiptUrl: string = '';

  
  generatedOrderId: number = 0;
  totalPayment: number = 0;

  //using JSON to get the item, from 'product'
  products: any[] = JSON.parse(localStorage.getItem('products') || '[]');

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productTitle = params['productTitle'];
      
      this.product = this.products.find((p) => p.title === this.productTitle);
    });
  }
  //a method that will be called if the user click "buy product"
  buyProduct(): void {
    //this code is used to generate a random order ID
    this.order.orderId = Math.floor(Math.random() * 1000) + 1;
    this.generatedOrderId = this.order.orderId;
    this.order.totalPrice = this.product.price;

    //to deduct the product stock if there is item sold
    if (this.product.stock > 0) {
      this.product.stock = this.product.stock -1;
    
      //to send a data to receipt, that will be used to generate the receipt
      this.router.navigate([
        '/receipt',
        this.order.orderId,
        {
          totalPrice: this.order.totalPrice,
          productTitle: this.product.title,
          productDescription: this.product.description,
          request: this.user.request,
          date: this.user.date,
        },
      ]);
    } 
    //used to alert the user if there is no stock availables
    else {
      console.log('Product out of stock');
      alert("Sorry, out of stock");
    }
  }

 
}



