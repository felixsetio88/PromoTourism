import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

import Swal from 'sweetalert2';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent {


  constructor(private router: Router, private authService: AuthService) {}

  // Check wether the password input is correct
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('userPass')?.value;
    const confirmPassword = control.get('userPassConfirm')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // form group of user data
  registrationForm = new FormGroup(
    {
      userEmail: new FormControl('', [Validators.required, Validators.email], [this.checkEmailTaken.bind(this)]),
      userPhone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      userName: new FormControl('', [Validators.required]),
      userAddress: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      userPassConfirm: new FormControl('', [Validators.required]),
      agreeTOS: new FormControl('', [Validators.requiredTrue]),
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  // To check if the email is unique
  checkEmailTaken(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.value;
    return new Promise((resolve, reject) => {
      this.authService.checkEmailAvailability(email).subscribe({
        next: (response: any) => {
          if (response.status === 200 && response.message === 'Email Taken') {
            console.log('Email has been taken');
            resolve({ emailTaken: true });
          } else {
            resolve(null);
            console.log('Email available');
          }
        },
        error: (error) => {
          console.error('Error checking email availability:', error);
          reject({ emailTaken: true });
        }
      });
    });
  }

  // to check wether the button is clicked
  submittedClicked = false;

  // Submit method
  onSubmit() {
    this.submittedClicked = true;
    if (this.registrationForm.get('agreeTOS')!.value) {
      if (this.registrationForm.valid) {
        // Construct FormData object
        const formData = new FormData();
        formData.append('name', this.registrationForm.get('userName')!.value || '');
        formData.append('email', this.registrationForm.get('userEmail')!.value || '');
        formData.append('password', this.registrationForm.get('userPass')!.value || '');
        formData.append('roles', 'user');
        formData.append('phoneNo', this.registrationForm.get('userPhone')!.value || '');
        formData.append('address', this.registrationForm.get('userAddress')!.value || '');

        // Register user
        this.authService.registerUser(formData).subscribe({
          next: (response) => {
            console.log('User registered successfully!', response);
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Account registration success!',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/']);
              }
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Try again later, we are resolving this issue',
              confirmButtonText: 'OK',
            });
          }
        });

      }
    }
  }
}
