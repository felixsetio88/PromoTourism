import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface registrationVariable {email: string; name: string; origin: string; passport: string; password: string}

@Injectable({
  providedIn: 'root'
})
export class customerService {

  constructor(private http: HttpClient) { }

  public data: registrationVariable[] = [];

  inputData(email: string, name: string, origin: string, passport: string, password: string) {
    this.data.push({
      email: email,
      name: name,
      origin: origin,
      passport: passport,
      password,
    });
  }

  showData() {
    return this.http.get('http://localhost:3000/data', {});
  }

  showHello() {
    return this.http.get('http://localhost:3000');
  }

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/login', {
      email,
      password
    });
  }
  /*register(email: string, name: string, origin: string, passport: string, password: string) {
    this.data.push({
      email: email,
      name: name,
      origin: origin,
      passport: passport,
      password: password
    });
  }*/
}
