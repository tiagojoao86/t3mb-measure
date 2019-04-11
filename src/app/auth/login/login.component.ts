import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../response';
import { UsersService } from '../../registration/users/users.service';
import { MessageService } from '../../message-service/message.service';
import { MessageSended } from '../../message-service/message-sended';
import { User } from '../../registration/users/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = '';

  constructor(private authService: AuthService, private userService: UsersService, 
    private messageService: MessageService,    
    private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.onLogin(null);
  }

  onLogin(form: NgForm) { 
    //const login = form.value.login;
    //const password = form.value.password;
    const login = 'admin';
    const password = '123456';

    this.httpClient.post<Response>('http://localhost:8080/auth', {login: login, password: password}).toPromise()
        .then(response => {                                              
          this.authService.setToken(response.data.token);
          this.userService.getUserByLogin(login).toPromise()
            .then((response: Response) => {
              const user: User = response.data;
              this.authService.setLoggedUser(user);                
              this.router.navigate(['/registration/users']);
            })
            .catch(
              error => {
                this.messageService.showMessage(new MessageSended(['Usuário não encontrado'], 'Erro'));
              }
            );
        })
        .catch(
            error => {
              this.messageService.showMessage(new MessageSended(['Por favor verifique o usuário e a senha'], 'Erro de Autenticação'));
            }
        );    
  }

}
