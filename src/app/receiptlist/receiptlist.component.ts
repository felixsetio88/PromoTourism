import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-receiptlist',
  templateUrl: './receiptlist.component.html',
  styleUrls: ['./receiptlist.component.css'],
})
export class ReceiptListComponent{
  //to get item 'receipt' using JSON
  receipts: any[] = JSON.parse(localStorage.getItem('receipts')|| '[]')
  //to download all of the receipt into 1 file
  downloadAsTxt(): void {
    const content = this.generateTxtContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'receipts.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  //to set the content of the txt file that can be downloaded as receipt
  private generateTxtContent(): string {
    let content = '';

    this.receipts.forEach((receipt, index) => {
      content += `Receipt ${index + 1}\n`;
      content += `Order ID: ${receipt.orderId}\n`;
      content += `Date: ${receipt.date}\n`;
      content += `Product Name: ${receipt.productTitle}\n`;
      content += `Product Description: ${receipt.productDescription}\n`;
      content += `Additional Request: ${receipt.request}\n`;
      content += `Total Price: $${receipt.totalPrice}\n\n`;
    });

    return content;
  }

  constructor(private router: Router) {}
  //to move the information to 'review' 
  navigateToReview(orderId: number, productTitle: string, productDescription: string): void {
    this.router.navigate(['/review', { orderId, productTitle, productDescription }]);
  }
}