// merchant.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
    private apiUrl = 'http://localhost:3000'; // Update with your server URL

    constructor(private http: HttpClient) {}
  
    loginAdministrator(username: string, password: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/login-administrator`, { username, password });
    }
  
    getSellers(): Observable<any> {
      return this.http.get(`${this.apiUrl}/get-sellers`);
    }
  
    acceptSeller(sellerId: string): Observable<any> {
      return this.http.put(`${this.apiUrl}/accept-seller/${sellerId}`, {});
    }
  
    denySeller(sellerId: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/deny-seller/${sellerId}`);
    }
  
    registerSeller(sellerData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/register-seller`, sellerData);
    }
}
