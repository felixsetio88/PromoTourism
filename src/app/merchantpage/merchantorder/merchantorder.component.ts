import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { ReviewService } from 'src/app/service/review.service';
import { TokenService } from 'src/app/service/token.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-merchantorder',
  templateUrl: './merchantorder.component.html',
  styleUrls: ['./merchantorder.component.css']
})
export class MerchantorderComponent implements OnInit {
  dtOptions: any = {};
  orders: any = [];
  merchantId: string = '';

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();

  private $destroy = new Subject<void>();

  //constructor
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private tokenService: TokenService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    //the datatable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true,
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'All'],
      ],
      responsive: true,
      dom: 'Blfrtip',
      buttons: ['copy', 'print', 'excel', 'pdf'],
    };
    this.fetchOrders();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  fetchOrders() {
    const merchantId = this.tokenService.getUserId();
    this.orderService.getOrderByMerchantId(merchantId).subscribe({
      next: (data) => {
        this.orders = data.data;
        this.dtTrigger.next(null as any);
        //push the product data for each data.productId inside each index of data
        this.orders.forEach((data: any) => {
          this.productService.getProduct(data.productId).subscribe({
            next: (productData) => {
              data.productData = productData.data;
            },
            error: (error) => {
              console.error('Error fetching product:', error);
            },
            complete: () => {
              console.log('Product data retrieval complete.');
            },
          });
        });
        //push the user data for each data.userId inside each index of data
        this.orders.forEach((data: any) => {
          this.authService.getUserDataById(data.userId).subscribe({
            next: (userData) => {
              data.userData = userData.merchant;
            },
            error: (error) => {
              console.error('Error fetching user:', error);
            },
            complete: () => {
              console.log('User data retrieval complete.');
            },
          });
        });
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
      complete: () => {
        console.log('Order data retrieval complete.');
      },
    });
  }
}
