//Necessary imports
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-registermerchant',
  templateUrl: './registermerchant.component.html',
  styleUrls: ['./registermerchant.component.css'],
})
export class RegistermerchantComponent {

  personalDatas: boolean;
  attachment: boolean;
  nextButton: boolean;

  constructor(private router: Router, private authService: AuthService) {

    this.personalDatas = true;
    this.attachment = false;
    this.nextButton = false;
  }

  //function to change the form
  changeForm() {
    this.personalDatas = !this.personalDatas;
    this.attachment = !this.attachment;
  }

  //User data form along with its validation.
  userDataForm = new FormGroup({
    userEmail: new FormControl(
      '',
      [Validators.required, Validators.email],
      [this.checkEmailTaken.bind(this)]
    ),
    userPhone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    userName: new FormControl('', [Validators.required]),
    userDescription: new FormControl('', [Validators.required]), 
    //"merchant" is a hard coded value because the roles is merchant
    roles: new FormControl('merchant'), 
    licenseDescription: new FormControl('', [Validators.required]),
    reviewsDescription: new FormControl('', [Validators.required]),
  });

  //Custom validator to check if email is taken
  checkEmailTaken(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.value;
    return new Promise((resolve, reject) => {
      this.authService.checkEmailAvailability(email).subscribe({
        next: (response: any) => {
          if (response.status === 200 && response.message === 'Email Taken') {
            resolve({ emailTaken: true });
          } else {
            resolve(null);
          }
        },
        error: (error) => {
          console.error('Error checking email availability:', error);
          reject({ emailTaken: true });
        },
      });
    });
  }

  //check if userEmail, userPhone, userName, and userDescription is validated.
  //If yes, then return true
  //If no, then return false
  isPersonalDataSectionValidated(): boolean {
    const isValid =
      this.userDataForm.controls.userEmail.valid &&
      this.userDataForm.controls.userPhone.valid &&
      this.userDataForm.controls.userName.valid &&
      this.userDataForm.controls.userDescription.valid;
    return isValid;
  }

  //check if userEmail, userPhone, userName, and userDescription is validated and nextButton is true
  //If yes, return nothing
  //If no, return swal
  personalDataBtnClick() {
    if (this.isPersonalDataSectionValidated()) {
      this.changeForm();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all the required fields!',
      });
    }
  }

  selectedFiles: Record<string, File> = {};
  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  //Handles file input, both from drag and drop and from file input change event
  handleFileInput(event: Event, fieldName: string): void {
    if (event instanceof DragEvent) {
      //handle drag and drop event
      event.preventDefault();
      const files = event.dataTransfer?.files;

      if (files && files.length > 0) {
        this.selectedFiles[fieldName] = files[0];
      }
    } else if (event instanceof Event) {
      //handle file input change event
      const element = event.currentTarget as HTMLInputElement;
      const fileList: FileList | null = element.files;

      if (fileList && fileList.length > 0) {
        this.selectedFiles[fieldName] = fileList[0];
      }
    }
  }

  //Handles file size conversion from bytes to KB or MB
  handleFileSizeConverter(fileSizeInBytes: number): string {
    let fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    if (fileSizeInMB < 1) {
      return (fileSizeInBytes / 1024).toFixed(2) + ' KB';
    } else {
      return fileSizeInMB.toFixed(2) + ' MB';
    }
  }

  //tracks if user submitted the form.
  submittedClicked = false;
//On submit, check if form is valid.
  onSubmit() {
    this.submittedClicked = true;
    //Check if there are any errors in the form.
    Object.keys(this.userDataForm.controls).forEach((key) => {
    const controlErrors: ValidationErrors = this.userDataForm.get(key)?.errors ?? {};
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach((keyError) => {
        console.error(keyError, controlErrors[keyError]);
      });
    }
    });
    //Ensure that the form is valid.
    if (this.userDataForm.valid) {
      const formData = new FormData();
      if (this.selectedFiles['license']) {
        formData.append('license', this.selectedFiles['license']);
      }
      if (this.selectedFiles['reviews']) {
        formData.append('reviews', this.selectedFiles['reviews']);
      }
      //Append data from the form to the FormData object
      const userEmail = this.userDataForm.get('userEmail')!.value;
      formData.append('email', userEmail !== null ? userEmail : '');

      const roles = this.userDataForm.get('roles')!.value;
      formData.append('roles', roles !== null ? roles: ''); // Make sure 'roles' has a value.

      const phoneNo = this.userDataForm.get('userPhone')!.value;
      formData.append('phoneNo', phoneNo !== null ? phoneNo: '');

      const description = this.userDataForm.get('userDescription')!.value;
      formData.append('description', description !== null ? description: '');

      const name = this.userDataForm.get('userName')!.value;
      formData.append('name', name !== null ? name: '');

      const licenseDescription = this.userDataForm.get('licenseDescription')!.value;
      formData.append('licenseDescription', licenseDescription !== null ? licenseDescription: '');

      const reviewsDescription = this.userDataForm.get('reviewsDescription')!.value;
      formData.append('reviewsDescription', reviewsDescription !== null ? reviewsDescription: '');

      //Send the form data to the backend.
      this.authService.registerUser(formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Registration success! Please kindly wait for officer to approve your account!',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/account/login']);
            }
          });
        },
        //If there is an error, display an error message.
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Error! The problem could be your uploaded file. It should be in .pdf format!',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'You must fill in all of the field!',
      });
    }
  }
}
