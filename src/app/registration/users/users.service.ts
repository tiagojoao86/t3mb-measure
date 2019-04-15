import { Injectable } from '@angular/core';
import { User, UserGroup } from './user';
import { RolesService } from '../../roles/roles.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Response } from '../../response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
@Injectable()
export class UsersService {
    
    private users: Array<User> = new Array<User>();
    private userGroups: Array<UserGroup> = new Array<UserGroup>();
    private editUser: User;

    constructor(rolesService: RolesService, private httpClient: HttpClient, private authService: AuthService,
        private router: Router) {        
        /*this.userGroups = new Array<UserGroup>(
            new UserGroup(1, 'Administradores'),
            new UserGroup(2, 'Coordenação'),
            new UserGroup(3, 'Recepção')
        );
        this.users = new Array<User>(
            new User(1,'Administrador','admin','123456', [rolesService.getRoleById(1)], this.getGroupById(1), 'A'),
            new User(2,'Avaliador', 'avaliador', '123456', [rolesService.getRoleById(2),rolesService.getRoleById(3)],
                    this.getGroupById(2), 'A'),
            new User(3, 'Avaliado', 'avaliado', '123456', [rolesService.getRoleById(3)], 
                this.getGroupById(3), 'A'),
            new User(4, 'Avaliado 2', 'avaliado2', '123456', [rolesService.getRoleById(3)], 
                this.getGroupById(3), 'I'),
        );
        this.getUserById(3).superior = this.getUserById(2);
        this.getUserById(3).hasSuperior = true;
        
        this.getUserById(1).superior = null;
        this.getUserById(1).hasSuperior = false;

        this.getUserById(2).superior = null;
        this.getUserById(2).hasSuperior = false;

        this.getUserById(4).superior = null;
        this.getUserById(4).hasSuperior = false;*/
        
    }  

    getUsers(): Array<User> {
        //this.httpClient.post<Response>('http://localhost:8080/auth', {login: login, password: password});
        return this.users;
    }

    getUserByLogin(login: string): Observable<Response> {
        return this.httpClient.get<Response>('http://localhost:8080/api/users/login/'+login, 
        {
            headers: this.getHeaders()
        });
    }

    getUserById(id: number): Observable<Response> {
        return this.httpClient.get<Response>('http://localhost:8080/api/users/'+id, 
        {
            headers: this.getHeaders()
        });
    }

    validateUser(login: string, password: string): User {
        var user: User = null;        
        this.users.forEach(element => {
            if (element.login == login && element.password == password){
                user = element;
            }
        });
        return user;
    }

    addUser(user: User): Observable<Response> {
        return this.httpClient.post<Response>('http://localhost:8080/api/users/', user,
        {
            headers: this.getHeaders()
        });
    }

    updateUser(user: User): Observable<Response> {
        return this.httpClient.put<Response>('http://localhost:8080/api/users/', user,
        {
            headers: this.getHeaders()
        });
    }

    getUsersByName(name: string): Array<User> {
        let result: Array<User> = new Array<User>();
        this.users.forEach(element => {
            if (element.name.toUpperCase().search(name.toUpperCase()) > -1) {
                result.push(element);
            }
        })
        return result;
    }

    getSuperiors(): Observable<Response> {
        return this.httpClient.get<Response>('http://localhost:8080/api/users/superiors', 
        {
            headers: this.getHeaders()
        });
    }

    getActiveUsersByName(name: string): Observable<Response> {        
        return this.httpClient.get<Response>('http://localhost:8080/api/users/active', 
        {
            headers: this.getHeaders()
        });
    }

    getNextId(): Observable<Response> {        
        return this.httpClient.get<Response>('http://localhost:8080/api/users/nextid', 
        {
            headers: this.getHeaders()
        });
    }

    getGroupById(id: number): UserGroup {
        let result: UserGroup;
        this.userGroups.forEach(element => {
            if (element.id == id) {
                result = element;
            }
        })

        return result;
    }

    getUserGroups(): Observable<Response> {        
        return this.httpClient.get<Response>('http://localhost:8080/api/user-groups', 
        {
            headers: this.getHeaders()
        });
    }

    getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer '+this.authService.getToken()
        });
    }

    setEditUser(user: User) {
        this.editUser = user;
    }

    getEditUser(): User {
        return this.editUser;
    }
/*
    getToken(login: string, password: string): Observable<Response> {        
        this.httpClient.post<Response>('http://localhost:8080/auth', {login: login, password: password});
        let token;
        this.httpClient.post<Response>('http://localhost:8080/auth', {login: login, password: password})
            .pipe(map((response) => {
                console.log("Teste");
                console.log(response);
            }));
        this.httpClient.post<Response>('http://localhost:8080/auth', {login: login, password: password})
            .subscribe((response) => {
                console.log("Teste");
                console.log(response);
            });
        return null;        
    }
*/
    
}