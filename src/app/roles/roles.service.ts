import { Injectable } from "@angular/core";
import { SysFunction } from '../auth/sysfunction';
import { Role } from '../auth/role';

@Injectable()
export class RolesService {
    private subFunctions: Array<SysFunction> = [
        new SysFunction('Usuarios', 100, '/registration/users',[]),
        new SysFunction('Meus Avaliados', 101, '/evaluations/my-evaluated',[]),
        new SysFunction('Minhas Avaliações', 102, '/evaluations/my-evaluations',[]),
        new SysFunction('Ciclos', 102, '/registration/cycles',[]),
        new SysFunction('Tipos de Avaliações', 103, '/registration/evaluations-type',[]),
        new SysFunction('Colaboradores', 104, '/evaluations/collaborators',[]),
    ];

    private sysFunctions: Array<SysFunction> = [
        new SysFunction('Cadastros', 1, '/registration', [this.subFunctions[0],this.subFunctions[3],this.subFunctions[4]]),
        new SysFunction('Meus Avaliados', 2, '/evaluations', [this.subFunctions[1],this.subFunctions[5]]),
        new SysFunction('Avaliações', 3, '/evaluations', [this.subFunctions[2]])
    ];

    private roles: Array<Role> = [
        {name: 'Administrador', id: 1, sysFunctions: [this.sysFunctions[0]]},
        {name: 'Avaliador', id: 2, sysFunctions: [this.sysFunctions[1]]},
        {name: 'Avaliado', id: 3, sysFunctions: [this.sysFunctions[2]]},
    ];

    getRoleById(id: number): Role {
        var result: Role;
        this.roles.forEach(element => {
            if (element.id === id) {
                result = element;
            }
        })

        return result;
    }

    getRoles(): Array<Role> {
        return this.roles;
    }
}