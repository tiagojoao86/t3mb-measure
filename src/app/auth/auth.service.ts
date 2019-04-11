import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../registration/users/users.service';
import { User } from '../registration/users/user';
import { SysFunction } from './sysfunction';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Response } from '../response';
import { MessageService } from '../message-service/message.service';
import { MessageSended } from '../message-service/message-sended';

@Injectable()
export class AuthService {

    loggedUser: User = null;
    jwtToken: string = '';

    constructor(private router: Router, private httpClient: HttpClient,
                    private messageService: MessageService) {}

    isAuthenticated(){
        return this.loggedUser != null;
    }

    setLoggedUser(user: User) {
        this.loggedUser = user;
    }

    getLoggedUser() : User {
        return this.loggedUser;
    }

    setToken(token: string) {
        this.jwtToken = token
    }

    getToken(): string {
        return this.jwtToken;
    }   
   
    verifyFunction(url: string): boolean {
        var result = false;
        this.loggedUser.roles.forEach(element => {
            element.sysFunctions.forEach(sysFunction => {
                if (sysFunction.url == url) {
                    result = true;
                }
                sysFunction.subFunctions.forEach(subFunction => {
                    if (subFunction.url == url) {
                        result = true;
                    } 
                })
            })           
        })
        return result;
    }
}
