import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  
  contactform: FormGroup;
  name: FormControl;
  email: FormControl;
  message: FormControl;
  errorMsg: string;
  constructor() { }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  createFormControls() {      
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")   
    ]);
    this.name = new FormControl('', [
      Validators.required     
    ]);
    this.message = new FormControl('', [
      Validators.required      
    ]); 
  }


  createForm() { 
    this.contactform = new FormGroup({   
      email: this.email,
      name: this.name,
      message:this.message   
    });
  }

  sendEmail(){
    if (this.contactform.valid) {
      this.errorMsg = '';
      console.log("Email"+ this.contactform.value.email +"Name: "+ this.contactform.value.name +" message:" +this.contactform.value.message);
    }
  }
}
