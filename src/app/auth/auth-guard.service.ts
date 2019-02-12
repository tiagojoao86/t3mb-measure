import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UsersService } from '../registration/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private usersService: UsersService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if (this.authService.isAuthenticated()){
            if (state.url == '/'){
                return true;
            }
            else {
                if (this.authService.verifyFunction(state.url)){
                    console.log('Permissao de acesso concedida');
                    return true;
                }
                else {
                    console.log('Permissao de acesso negada');
                    this.router.navigate(['/login']);
                    return false;
                }
            }
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }  
    }
}