// src/app/login/login.component.ts

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: Login;
  signupObj: Signup;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
    this.signupObj = new Signup();
  }

  onLogin() {
    this.http.post('http://localhost:8000/api/login/', this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert("Login success");
        this.router.navigate(['/dashboard']); // Navigate to dashboard
      } else {
        alert(res.message);
      }
    }, error => {
      alert("Login failed: " + error.message);
    });
  }

  onSignup() {
    console.log("signupObj",this.signupObj)
    this.http.post('http://localhost:8000/api/signup/', this.signupObj).subscribe((res: any) => {
      if (res.result) {
        alert("Signup success");
      } else {
        alert(res.message);
      }
    }, error => {
      alert("Signup failed: " + error.message);
    });
  }
}

export class Login {
  EmailId: string;
  Password: string;

  constructor() {
    this.EmailId = '';
    this.Password = '';
  }
}

export class Signup {
  UserName: string;
  Email: string;
  Password: string;
  IsSupervisor: boolean;
  EmployeeCode: string;

  constructor() {
    this.UserName = '';
    this.Email = '';
    this.Password = '';
    this.IsSupervisor = false;
    this.EmployeeCode = '';
  }
}
