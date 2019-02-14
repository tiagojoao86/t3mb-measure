import { Injectable } from '@angular/core';
import { User, UserGroup } from './user';
import { RolesService } from '../../roles/roles.service';
@Injectable()
export class UsersService {

    private users: Array<User> = new Array<User>();
    private userGroups: Array<UserGroup> = new Array<UserGroup>();

    constructor(rolesService: RolesService) {
        this.userGroups = new Array<UserGroup>(
            new UserGroup(1, 'Administradores'),
            new UserGroup(2, 'Coordenação'),
            new UserGroup(3, 'Recepção')
        );
        this.users = new Array<User>(
            new User(1,'Administrador','admin','123456', [rolesService.getRoleById(1)], this.getGroupById(1), 'A'),
            new User(2,'Avaliador', 'avaliador', '123456', [rolesService.getRoleById(2),rolesService.getRoleById(3)],
                    this.getGroupById(2), 'A'),
            new User(3, 'Avaliado', 'avaliado', '123456', [rolesService.getRoleById(2)], 
                this.getGroupById(3), 'A'),
            new User(4, 'Avaliado 2', 'avaliado2', '123456', [rolesService.getRoleById(2)], 
                this.getGroupById(3), 'I'),
        );  
    }  

    getUsers(): Array<User> {
        return this.users;
    }

    getUserLogin(login: string): User {
        var user: User = null;        
        this.users.forEach(element => {
            if (element.login === login){
                user = element;
            }
        });
        return user;
    }

    getUserById(id: number): User {
        var user: User = null;        
        this.users.forEach(element => {
            if (element.id === id){
                user = element;
            }
        });
        return user;
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

    addUser(user: User) {
        this.users.push(user);
    }

    updateUser(user: User) {
        for (let i = 0; i < this.users.length; i++){
            if (this.users[i].id == user.id) {
                this.users[i] = user;
            }
        }
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

    getActiveUsersByName(name: string): Array<User> {
        let result: Array<User> = new Array<User>();
        this.users.forEach(element => {
            if (element.name.toUpperCase().search(name.toUpperCase()) > -1 && element.status == 'A') {
                result.push(element);
            }
        });
        return result;
    }

    getNextId(): number {
        let result = 0;
        this.users.forEach(element => {
            if (element.id > result) {
                result = element.id+1;
            }
        });
        
        return result;
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



    

    

}