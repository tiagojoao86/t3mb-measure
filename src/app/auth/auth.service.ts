import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../registration/users/users.service';
import { User } from '../registration/users/user';
import { SysFunction } from './sysfunction';

@Injectable()
export class AuthService {

    loggedUser: User = null;

    jwtToken: String = '';

    constructor(private router: Router, private usersService: UsersService) {}

    isAuthenticated(){
        return this.loggedUser != null;
    }

    setLoggedUser(user: User) {
        this.loggedUser = user;
    }

    getLoggedUser() : User {
        return this.loggedUser;
    }

    loginUser(login: string, password: string) {
        this.jwtToken = this.usersService.getToken(login,password);
        this.loggedUser = this.usersService.validateUser(login,password);
        if (this.loggedUser != null) {
            return true;
        }
        else {
            return false;
        }
        
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
