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
  constructor(private route: Router) {}

  ngOnInit(): void {}
  login() {
    if (this.email === 'admin@gmail.com' && this.password === 'Admin') {
      // this.route.navigate(['/rooms', 'add']);
      this.route.navigateByUrl('/rooms/add');
    }
  }
}
