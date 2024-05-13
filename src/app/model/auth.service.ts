import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: string ='';

  login(username: string, password: string): boolean {
    //officer account is hard codded
    if (username === 'admin' && password === 'admin') {
      this.loggedInUser = 'admin';
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedInUser = '';
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  getLoggedInUser(): string {
    return this.loggedInUser;
  }
}