import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  showModal: boolean = false;
  alertTitle: string = 'Register';
  alertMessage: string = 'Please wait! Registering your account.';
  alertColor: string = 'blue';

  constructor(private registerService: RegisterService,private router: Router) {}

  firstname= new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  lastname = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  role = new FormControl('');

  registerForm: FormGroup = new FormGroup({
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
    role: this.role
  });

  register(): boolean | void {
    // this.showModal = true;
    // this.alertMessage = 'Please wait! Registering your account.';
    // this.alertColor = 'blue';
    const {firstname, lastname, email, password, confirmPassword, role} = this.registerForm.value;
    if (password !== confirmPassword){
      this.showModal = true;
      this.alertTitle = 'Password Mismatch';
      this.alertMessage = 'Passwords do not match! Please try again.';
      this.alertColor = 'red';

      setTimeout(() => {
        this.showModal = false;
      }, 5000);
    } else if (this.registerForm.invalid){
      this.showModal = true;
      this.alertTitle = 'Invalid Form';
      this.alertMessage = 'Please fill out the form correctly.';
      this.alertColor = 'red';

      setTimeout(() => {
        this.showModal = false;
      }, 5000);
    }
    else if (["admin", "user"].includes(role) === false || role === '' || role === null || role === undefined || role === 'null' || role === 'undefined' || role === ' '){
      this.showModal = true;
      this.alertTitle = 'Invalid Role';
      this.alertMessage = 'Please chose a role between admin and user.';
      this.alertColor = 'red';

      setTimeout(() => {
        this.showModal = false;
      }, 5000);
    }
    else {
      console.log('Registering user...');
      const user: User = new User(
        undefined,
        `${firstname} ${lastname}`,
        '',
        email,
        password,
        role,
        '',
        '',
        ''
      );

      this.registerService.registerUser(user).subscribe(
        responseData => {
          this.showModal = true;
          this.alertTitle = 'Registration Successful';
          this.alertMessage = 'Your account has been successfully registered.';
          this.alertColor = 'green';

          setTimeout(() => {
            this.showModal = false;
            this.router.navigate(['login']);
          }, 5000);
        }, error => {
          console.log(error);
          this.showModal = true;
          this.alertTitle = 'Registration Failed';
          this.alertMessage = 'Your account could not be registered. Please try again.';
          this.alertColor = 'red';

          setTimeout(() => {
            this.showModal = false;
          }, 5000);
        });
    }

  }
}
