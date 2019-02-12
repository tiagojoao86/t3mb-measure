import { Injectable } from "@angular/core";
import { SysFunction } from '../auth/sysfunction';
import { Role } from '../auth/role';

@Injectable()
export class RolesService {
    private subFunctions: Array<SysFunction> = [
        new SysFunction('Usuarios', 100, '/registration/users',[]),
        new SysFunction('Colaboradores', 101, '/meus-avaliados/colaboradores',[]),
        new SysFunction('Meus Ciclos', 102, '/minhas-avaliacoes/meus-ciclos',[]),
        new SysFunction('Ciclos', 102, '/registration/cycles',[]),
        new SysFunction('Tipos de Avaliações', 103, '/registration/evaluations-type',[]),
    ];

    private sysFunctions: Array<SysFunction> = [
        new SysFunction('Cadastros', 1, '/registration', [this.subFunctions[0],this.subFunctions[3],this.subFunctions[4]]),
        new SysFunction('Meus Avaliados', 2, '/meus-avaliados', [this.subFunctions[1]]),
        new SysFunction('Minhas Avaliações', 3, '/minhas-avaliacoes', [this.subFunctions[2]])
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