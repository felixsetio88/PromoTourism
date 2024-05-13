// Importing necessary modules and services
import { SimpleChanges } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkmerchant',
  templateUrl: './checkmerchant.component.html',
  styleUrls: ['./checkmerchant.component.css']
})
export class CheckmerchantComponent implements OnInit {

  // DataTable options and merchant data array
  dtOptions: any = {};
  merchants: any[] = [];

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Fetching merchant data on component initialization
    this.fetchMerchants();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['merchants'] && changes['merchants'].currentValue) {
      // DataTable configuration options
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 15,
        processing: true,
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 25, 50, 'All'],
        ],
        responsive: true,
        dom: 'Bflrtip',
        buttons: ['copy', 'print', 'excel', 'pdf'],
      };
    }
  }
  
  // Fetching merchants data from the authentication service
  fetchMerchants() {
    this.authService.getMerchants().subscribe({
      next: (data) => {
        this.merchants = data;
        console.log('Fetched merchants:', this.merchants);
        this.dtTrigger.next(null as any);
      },
      error: (error) => {
        console.error('Error fetching merchants:', error);
      },
      complete: () => {
        console.log('Merchant data retrieval complete.');
      },
    });
  }
  

  // Navigating to the detail view of a merchant without passing any parameters
  navigateWithoutParams(route: string, id: string) {
    console.log(id);
    const navigationExtras: NavigationExtras = {
      skipLocationChange: true,
    };

    this.router.navigate([route, id], navigationExtras);
  }

  // Accepting a merchant and handling success/error responses
  acceptMerchant(merchantId: string) {
    this.authService.acceptMerchant(merchantId).subscribe({
      next: (response) => {
        console.log('Merchant accepted:', response);
      },
      error: (error) => {
        // Displaying an error message using Swal (SweetAlert)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      },
      complete: () => {
        console.log('Accepting merchant complete.');
        
        // Displaying a success message using Swal and reloading the page
        Swal.fire({
          icon: 'success',
          title: 'Merchant accepted!',
          text: 'Merchant has been accepted.',
        }).then(() => {
          window.location.reload();
        });
      },
    });
  }

  // Rejecting a merchant and handling success/error responses
  rejectMerchant(merchantId: string) {
    this.authService.rejectMerchant(merchantId).subscribe({
      next: (response) => {
        console.log('Merchant rejected:', response);
      },
      error: (error) => {
        // Displaying an error message using Swal (SweetAlert)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      },
      complete: () => {
        console.log('Rejecting merchant complete.');
        
        // Displaying a success message using Swal and reloading the page
        Swal.fire({
          icon: 'success',
          title: 'Merchant rejected!',
          text: 'Merchant has been rejected.',
        }).then(() => {
          window.location.reload();
        });
      },
    });
  }
}
