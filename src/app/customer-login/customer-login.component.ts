import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { customerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})

export class CustomerLoginComponent implements OnInit{


  constructor(private reg: customerService, private router: Router) { }

  email: string = ''; // Property
  password: string = '';

  ngOnInit(): void {
  }

  /*masuk() {
    this.ss.login(this.username, this.password).subscribe(
      {
        next: (response: any) => {
          localStorage.setItem('sekolaku-token', response.token);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }*/
  masuk(){
    //this.reg.login(this.email, this.password).subscribe((response) => {
      //console.log(response);
      next:{
        //localStorage.setItem('user', response.token);
        //this.router.navigate('/panel/siswa');
      //},
      //error:(error) =>{ 

      }

    //});
  }

}


