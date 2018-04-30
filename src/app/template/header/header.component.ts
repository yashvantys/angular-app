import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('username');
  }

  logout(){
    sessionStorage.clear();
    sessionStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

}
