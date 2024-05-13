import { Component } from '@angular/core';

@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html',
  styleUrls: ['./reviewlist.component.css']
})
export class ReviewlistComponent {
  //to get the item using JSON
  reviews: any[] = JSON.parse(localStorage.getItem('reviews') || '[]');
  isLoggedIn: boolean = false;

  constructor() {
    this.isLoggedIn = true; 
  }
}

