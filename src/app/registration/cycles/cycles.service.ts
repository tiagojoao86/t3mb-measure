import { Injectable } from '@angular/core';
import { Cycle } from './cycle';
import { CycleStatus } from './cycleStatus';
import { UserGroup } from '../users/user';
import { EvaluationType } from '../evaluations/evaluation-type/evaluation-type';
import { UsersService } from '../users/users.service';
import { EvaluationTypeService } from '../evaluations/evaluation-type/evaluation-type.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { CycleConfiguration } from './cycle-configuration';
@Injectable()
export class CyclesService {

    cycleId: number = 0;
    cycleConfigurationId: number = 0;

    removeConfiguration = new Subject();
    updateConfiguration = new Subject();
    private cycles: Array<Cycle> = new Array<Cycle>();
    statusList: Array<CycleStatus> = [
        new CycleStatus(1, 'Iniciado'),
        new CycleStatus(2, 'Encerrado'),
    ]

    constructor(private usersService: UsersService, private evaluationTypeService: EvaluationTypeService) {
        
        this.cycles = new Array<Cycle>(
            new Cycle(this.getNextId(),'2017',new Date(2017, 0, 1),this.statusList[1]),
            new Cycle(this.getNextId(),'2018-A',new Date(2018, 0, 1),this.statusList[1]),
            new Cycle(this.getNextId(),'2018-B',new Date(2018, 5, 1),this.statusList[1]),
            new Cycle(this.getNextId(),'2019',new Date(2019, 0, 1),this.statusList[0])
        );

        this.cycles[0].configurations = new Array<CycleConfiguration>(
            new CycleConfiguration(this.getNextCycleConfigurationId(), 
                                    this.evaluationTypeService.getEvaluationTypeById(1),
                                    this.usersService.getGroupById(3))
        );

        this.cycles[3].configurations = new Array<CycleConfiguration>(
            new CycleConfiguration(this.getNextCycleConfigurationId(), 
                                    this.evaluationTypeService.getEvaluationTypeById(1),
                                    this.usersService.getGroupById(3))
        );
        
        
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
        this.cycleId++;
        return this.cycleId;
    }

    getNextCycleConfigurationId(){
        this.cycleConfigurationId++;
        return this.cycleConfigurationId;
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