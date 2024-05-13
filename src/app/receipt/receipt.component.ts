// receipt.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit {
  //initialization of variable
  orderId: number = 0;
  totalPrice: number = 0;
  productTitle: string = '';
  productDescription: string = '';
  request: string = '';
  date: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = +params['orderId'];
      this.totalPrice = +params['totalPrice'];
      this.productTitle = params['productTitle'];
      this.productDescription = params['productDescription'];
      this.request = params['request'];
      this.date = params['date'];

      
      
    });
  }
//method that is used to download as txt file
  downloadAsTxt(): void {
    //the content of the txt file that will be generated
    const content = `
Order ID: ${this.orderId}
Date: ${this.date}
--------------------------------------------------------
Product Name: ${this.productTitle}
Product Description: ${this.productDescription}
Additional Request: ${this.request}
--------------------------------------------------------
Total Price: $${this.totalPrice}
`;
    //an object that represents a raw data
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    //set the name of the file
    link.download = 'receipt.txt';
    document.body.appendChild(link);
    //to make it trigger after a click
    link.click();
    //to remove the link
    document.body.removeChild(link);
  }
  // a method that is used to submit the data after the user click on "submit"
  Submit(){
    const receipt = {
      orderId: this.orderId,
      totalPrice: this.totalPrice,
      productTitle: this.productTitle,
      productDescription : this.productDescription,
      request: this.request,
      date : this.date,
    }
    //a JSON that is used to get an item in 'receipts'
    const receipts = JSON.parse(localStorage.getItem('receipts') || '[]');
    receipts.push(receipt);
    //a JSON that is used to store a data
    localStorage.setItem('receipts', JSON.stringify(receipts));
    // to alert the user that the purchase is success
    alert("Your purchase is successful!")
    
  }
  
}