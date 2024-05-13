import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

import Swal from 'sweetalert2';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private router: Router, private authService: AuthService) {
  }

 passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('userPass')?.value;
  const confirmPassword = control.get('userPassConfirm')?.value;

  // Check if both passwords match
  return password === confirmPassword ? null : { passwordMismatch: true };
}

  //User data form along with its validation.
  userDataForm = new FormGroup(
    {
      // userEmail: new FormControl('', [Validators.required, Validators.email]),
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ], [
        // Custom asynchronous validator to handle emailTaken error
        this.checkEmailTaken.bind(this)
      ]),
      userPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      userName: new FormControl('', [Validators.required]),
      userAddress: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      userPassConfirm: new FormControl('', [Validators.required]),
      agreeTOS: new FormControl('', [Validators.requiredTrue]),
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  //Custom asynchronous validator to check if email is taken or not.
  //Pings the backend if the email is taken or not.
  checkEmailTaken(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.value;
    return new Promise((resolve, reject) => {
      this.authService.checkEmailAvailability(email).subscribe({
        next: (response: any) => {
          if (response.status === 200 && response.message === 'Email Taken') {
            console.log('Email taken');
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
  
  //A counter to check if user has clicked the submit button.
  //Useful to trigger the validation warnings.
  submittedClicked = false;

  //Submit user data form.
  //If form is valid then construct FormData object and send it to backend.
  //If register is successful then show success message and redirect user to login page.
  onSubmit() {
    this.submittedClicked = true;
    if (this.userDataForm.get('agreeTOS')!.value) {
      if (this.userDataForm.valid) {
        // Construct FormData object
        const formData = new FormData();
        const name = this.userDataForm.get('userName')!.value;
        formData.append('name', name !== null ? name: '');

        const email = this.userDataForm.get('userEmail')!.value;
        formData.append('email', email !== null ? email: '');

        const password = this.userDataForm.get('userPass')!.value;
        formData.append('password', password !== null ? password: '');

        formData.append('roles', 'user');

        const phoneNo = this.userDataForm.get('userPhone')!.value;
        formData.append('phoneNo', phoneNo !== null ? phoneNo: '');

        const address = this.userDataForm.get('userAddress')!.value;
        formData.append('address', address !== null ? address: '');

        this.authService.registerUser(formData).subscribe({
          next: (response) => {
            console.log('User registered successfully!', response);
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Yeay, your account is registered!',
              confirmButtonText: 'OK',
              iconColor: '#4F46E5',
              color: '#4F46E5',
              confirmButtonColor: '#4F46E5',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/']);
              }
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              confirmButtonText: 'OK',
              iconColor: '#4F46E5',
              color: '#4F46E5',
              confirmButtonColor: '#4F46E5',
            });
          }
        });

      }
    }
  }
  

  

}

