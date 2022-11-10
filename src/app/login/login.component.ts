import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private route: Router, private loginService: LoginService) {}

  ngOnInit(): void {}
  login() {
    if (this.loginService.login(this.email, this.password)) {
      this.route.navigateByUrl('/rooms');
    }
    // if (this.email === 'admin@gmail.com' && this.password === 'Admin') {
    // this.route.navigate(['/rooms', 'add']);
    // this.route.navigateByUrl('/rooms/add');
  }
}
