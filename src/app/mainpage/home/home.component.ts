import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/app/environment';
import { ProductService } from 'src/app/service/product.service';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any[] = [];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    private productService: ProductService,
    private reviewService: ReviewService
  ) {
    this.productService.getProducts().subscribe((products) => {
      // Initialize a count
      let count = 0;
      // Ensure that you process only up to 10 products
      const maxProducts = 10;

      for (let i in products) {
        if (count >= maxProducts) {
          // If we have processed 10 products, break the loop
          break;
        }
        //get review by product id
        this.reviewService.getReviewAverage(products[i]._id).subscribe({
          next: (res) => {
            //add review average to products
            products[i].reviewAverage = res.data;
            this.products = products;
            //check if products[i].reviewAverage is bigger than the other reviewAverage, make it in first (sort biggest to lowest)
            this.products.sort((a, b) => {
              return b.reviewAverage - a.reviewAverage;
            });
          },

          error: (err) => {
            console.error(err);
          },
        });
      }
    });
  }

  //Retreive the cover image URL.
  readCoverImageURL(coverImagePath: string): string {
    return environment.productImgUrl + '/' + coverImagePath;
  }

  //Scrolls left on the carousel.
  scrollLeft() {
    this.scrollContainer.nativeElement.scrollTo({
      left: this.scrollContainer.nativeElement.scrollLeft - 300,
      behavior: 'smooth',
    });
  }
  //Scrolls right on the carousel.
  scrollRight() {
    this.scrollContainer.nativeElement.scrollTo({
      left: this.scrollContainer.nativeElement.scrollLeft + 300,
      behavior: 'smooth',
    });
  }
  modifyImagePath(coverImagePath: string): string {
    // Use the JavaScript split() method to separate the file name and extension
    const parts = coverImagePath.split('.');
    
    // Check if there's a file extension
    if (parts.length > 1) {
      // Join all parts except the last one to exclude the extension
      return parts.slice(0, -1).join('');
    } else {
      return coverImagePath; // No file extension, return the original value
    }
  }
  
}
