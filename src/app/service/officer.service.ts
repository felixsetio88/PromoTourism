import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface DataRegistrasi {
  username: string;
  password: string;

}

@Injectable({
  providedIn: 'root'
})
export class OfficerService {

  constructor(private http: HttpClient) { }

  public data: DataRegistrasi[] = [];

  showAll() {
    return this.http.get('http://localhost:3000/officer', {});
  }

  showHello() {
    return this.http.get('http://localhost:3000');
  }

  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/officer/login', {
      username,
      password
    });
  }
  register(username: string, password: string){
    this.data.push({
        username: username,
        password: password,
    
      });
  }
}
