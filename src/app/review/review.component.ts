import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  //initialization of variable
  orderId: number = 0;
  productTitle: string = '';
  productDescription: string = '';
  review: string = '';
  comment: string = '';
  isReviewed: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = +params['orderId'];
      this.productTitle = params['productTitle'];
      this.productDescription = params['productDescription'];
    });
  }
//method that will be called after the user press on submit review
  submitReview(): void {
    //check if the product has been reviewed before
    const reviewedOrders = JSON.parse(localStorage.getItem('reviewedOrders') || '[]');
    if (reviewedOrders.includes(this.orderId)) {
      alert('This order has already been reviewed.');
    } 
    //if the product hasn't been reviewed before
    else {
      const reviewData = {
        orderId: this.orderId,
        productTitle: this.productTitle,
        productDescription: this.productDescription,
        review: this.review,
        comment: this.comment,
      };
      //using JSON
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      reviews.push(reviewData);
      //to store the data using JSON
      localStorage.setItem('reviews', JSON.stringify(reviews));

      reviewedOrders.push(this.orderId);
      //using JSON
      localStorage.setItem('reviewedOrders', JSON.stringify(reviewedOrders));
      this.isReviewed = true;
      //to alert the user that the submit is successful
      alert('Review submitted successfully!');
    }
  }
}