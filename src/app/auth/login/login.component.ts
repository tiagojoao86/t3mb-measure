import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = '';

  constructor(private authService: AuthService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) { 
    const login = form.value.login;
    const password = form.value.password;
     /*if (this.authService.loginUser(login, password)) {
        this.router.navigate(['/']);
     }
     else{
       this.error = 'Login ou Senha Inválidos';
     }*/
    this.authService.loginUser(login,password);
    
  }

}
