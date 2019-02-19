import { Injectable } from '@angular/core';
import { Cycle } from './cycle';
import { CycleStatus } from './cycleStatus';
import { UserGroup } from '../users/user';
import { EvaluationType } from '../evaluations/evaluation-type/evaluation-type';
import { UsersService } from '../users/users.service';
import { EvaluationTypeService } from '../evaluations/evaluation-type/evaluation-type.service';
import { Subject } from 'rxjs';
@Injectable()
export class CyclesService {

    removeConfiguration = new Subject();
    updateConfiguration = new Subject();
    private cycles: Array<Cycle> = new Array<Cycle>();
    statusList: Array<CycleStatus> = [
        new CycleStatus(1, 'Iniciado'),
        new CycleStatus(2, 'Encerrado'),
    ]

    constructor(private usersService: UsersService, private evaluationTypeService: EvaluationTypeService) {
        
        this.cycles = new Array<Cycle>(
            new Cycle(1,'2017',new Date(2017, 0, 1),this.statusList[1]),
            new Cycle(2,'2018-A',new Date(2018, 0, 1),this.statusList[1]),
            new Cycle(3,'2018-B',new Date(2018, 5, 1),this.statusList[1]),
            new Cycle(4,'2019',new Date(2019, 0, 1),this.statusList[0])
        );

        this.cycles[0].configurations = [
            {userGroup: this.usersService.getGroupById(3),
             evaluationType: this.evaluationTypeService.getEvaluationTypeById(1)}
        ];
            
        
        
    }  

    getCycles(): Array<Cycle> {
        return this.cycles;
    }
    

    getCycleById(id: number): Cycle {
        var Cycle: Cycle = null;        
        this.cycles.forEach(element => {
            if (element.id === id){
                Cycle = element;
            }
        });
        return Cycle;
    }

    

    addCycle(Cycle: Cycle) {
        this.cycles.push(Cycle);
    }

    updateCycle(cycle: Cycle) {
        for (let i = 0; i < this.cycles.length; i++){
            if (this.cycles[i].id == cycle.id) {
                this.cycles[i] = cycle;
            }
        }
    }

    getCyclesByName(name: string): Array<Cycle> {
        let result: Array<Cycle> = new Array<Cycle>();
        this.cycles.forEach(element => {
            if (element.name.toUpperCase().search(name.toUpperCase()) > -1) {
                result.push(element);
            }
        }) 
        return result;
    }

    getNextId(): number {
        let result = 0;
        this.cycles.forEach(element => {
            if (element.id > result) {
                result = element.id;
            }
        });
        result++;
        return result;
    }

    getCycleStatusById(id: number) : CycleStatus {
        let result: CycleStatus = this.statusList[0];
        this.statusList.forEach(element => {
            if (element.id == id) {
                result = element;
            }
        })

        return result;
    }
}