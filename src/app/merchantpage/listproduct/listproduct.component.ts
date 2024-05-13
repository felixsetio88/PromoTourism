import { ProductService } from '../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/environment';
import { NavigationExtras, Route, Router } from '@angular/router';
import { ReviewService } from '../../service/review.service';
import { TokenService } from 'src/app/service/token.service';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit{
  products: any = [];
  coverImage: { url: string; fileName: string }[] = [];
  //A form to contain products
  fileName = '';
  searchTerm: string ='';
  filteredProducts: any[] = [];
  selectedSortOption: string = 'default';
  selectedFilterOption: string = 'all';
  currentPage: any = 1;
  itemsPerPage: any = 1;
  // totalItems = this.filterProducts.length;
  productForm: FormGroup;
  mathCeil = Math.ceil;
i: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router, // private searchSubject: Subject<string> = new Subject()
    private reviewService: ReviewService,
    private tokenService: TokenService,
  ) {
    this.readProduct();
    //form builder
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      discount: [''],
      category: [''],
      images: [null], // To handle multiple images (FileList)
    });
  }
  ngOnInit() {
    // this.searchSubject
    //   .pipe(
    //     debounceTime(300) //wait 300ms wait in events
    //   )
    //   .subscribe((searchTerm) => {
    //     this.onSearch(searchTerm);
    //   });
    this.filteredProducts = this.products || [];
  }
  //Gets all products from the product service.

  readProduct() {
    const merchantId = this.tokenService.getUserId();
    this.productService.getProductsByMerchantId(merchantId).subscribe(
      (productsArray) => {
        this.products = productsArray;
        //push the average rating of the product based on the productsArray._id inside each index of products array
        this.products.forEach((data: any) => {
          this.reviewService.getReviewAverage(data._id).subscribe({
            next: (averageRating) => {
              if (averageRating.data)
                data.averageRating = Math.round(averageRating.data);
              else data.averageRating = 0;
            },
            error: (error) => {
              console.error('Error fetching average rating:', error);
            },
            complete: () => {
              console.log('Average rating retrieval complete.');
            },
          });
        });
        //this.dtTrigger.next(undefined);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  readCoverImageURL(coverImagePath: string): string {
    return environment.productImgUrl + '/' + coverImagePath;
  }

  onSearch(): void {
    // Apply search
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter((product: { name: string; }) =>
        product.name.toLowerCase().includes(searchTermLower)
      );
    } else {
      // If the search term is empty, reset to the full list of products
      this.filteredProducts = [...this.products];
    }

    // Apply filter
    if (this.selectedFilterOption !== 'all') {
      this.filteredProducts = this.filteredProducts.filter(
        (product) => product.category === this.selectedFilterOption
      );
    }

    // Apply sort
    switch (this.selectedSortOption) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // If 'default' is selected, no additional sorting is needed
        break;
    }
  }

  sortProducts() {
    switch (this.selectedSortOption) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        this.filteredProducts = this.filteredProducts;
        break;
    }
  }

  //method to filter the products
  filterProducts() {
    if (this.selectedFilterOption === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        (product: { category: string; }) => product.category === this.selectedFilterOption
      );
    }
  }

  // get paginatedProducts() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.filteredProducts.slice(
  //     startIndex,
  //     startIndex + this.itemsPerPage
  //   );
  // }

  // onPageChange(page: number) {
  //   this.currentPage = page;
  // }

  //Deletes a product using the product service.
  deleteProduct(product: { _id: any; }, index: any) {
    if (window.confirm('Are you sure?')) {
      this.productService.deleteProduct(product._id).subscribe((data) => {
        this.products.splice(index, 1);
      });
    }
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
