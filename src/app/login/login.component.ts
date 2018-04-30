import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: '<app-login></app-login>',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  email: FormControl;
  password: FormControl;
  errorMsg:string;
  error:boolean = false;
  constructor(private authService: AuthService,private router: Router) {
    
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  chkLogin() {
    if (this.loginform.valid) {
      this.errorMsg = '';
      //console.log(this.email+": "+this.password);
      this.errorMsg = '';
        this.authService.login(this.loginform.value.email, this.loginform.value.password).subscribe(auth =>{
          if(auth) {
           // console.log('success case' + auth);
            this.router.navigate(['/user/dashboard']);
          }else{
            this.error = true;
          }
        });
    }
  }

  createFormControls() {      
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")   
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]); 
  }

  createForm() { 
    this.loginform = new FormGroup({   
      email: this.email,
      password: this.password   
    });
  }

  

}
