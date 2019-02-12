import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../registration/users/users.service';
import { User } from '../registration/users/user';
import { SysFunction } from './sysfunction';

@Injectable()
export class AuthService {

    loggedUser: User = null;

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
            result = this.verifyAllFunctions(element.sysFunctions, url);
        })
        return result;
    }

    private verifyAllFunctions(sysFunctions: Array<SysFunction>, url: string): boolean {
        var result = false;
        var i = 0;
        for (i = 0; i < sysFunctions.length; i++){
            if ((sysFunctions[i].url) == url) {
                result = true;
                break;                
                
            }
            if (sysFunctions[i].subFunctions.length > 0){
                result = this.verifyAllFunctions(sysFunctions[i].subFunctions, url);
            }
        }
        return result;
    }


}
