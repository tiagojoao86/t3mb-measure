import { Role } from '../../auth/role';

export class User {
    id: number;
    name: string;
    login: string;
    password: string;
    roles: Role[];
    userGroup: UserGroup;
    superior: User;
    hasSuperior: boolean;
    status: string;

    constructor(id: number, name: string, login: string, password: string, roles: Role[],
        userGroup: UserGroup, status: string){
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.roles = roles;
        this.userGroup = userGroup;
        this.status = status;
    }

    isRolePresent(id: number): boolean {
        var result = false;
        this.roles.forEach(role => {
            if (role.id === id) {
                result = true;
            }
        });

        return result;
    }

    isActive(): boolean {
        if (this.status == 'A') {
            return true;
        }
        else {
            return false;
        }
    }

    toString() : string {
        return '('+this.id+') '+this.name;
    }
    
}

export class UserGroup {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    toString() {
        return '('+this.id+') '+this.name;
    }
}