import { Injectable } from "@angular/core";
import { UsersService } from '../registration/users/users.service';
import { EvaluationTypeService } from '../registration/evaluations/evaluation-type/evaluation-type.service';
import { CyclesService } from '../registration/cycles/cycles.service';
import { User } from '../registration/users/user';
import { Evaluation } from './evaluation';

@Injectable()
export class EvaluationsService {

    evaluationId: number = 0;
    idpId: number = 0;
    evaluations: Array<Evaluation> = new Array<Evaluation>();

    constructor(private usersService: UsersService,
        private evaluationTypeService: EvaluationTypeService,
        private cyclesService: CyclesService) {

        this.cyclesService.getCycles().forEach(cycle => {            
            cycle.configurations.forEach(configuration => {                
               usersService.getUsers().forEach(user => {
                   if (user.userGroup.id == configuration.userGroup.id) {
                       this.evaluations.push(new Evaluation(user.id+'-'+configuration.id,
                        configuration.evaluationType, cycle, user, user.superior, Evaluation.AUTO));
                   }
               })
            })
        });           
    }


    getMyEvaluations(user: User, search: string): Array<Evaluation> {
        let result: Array<Evaluation> = new Array<Evaluation>();
        this.evaluations.forEach(evaluation => {
            if (evaluation.mesured.id == user.id && 
                evaluation.cycle.name.toUpperCase().search(search) > -1) {
                    result.push(evaluation);
                }
        })

        return result;
    }

    getInProgressMyEvaluations(user: User, search: string): Array<Evaluation> {
        let result: Array<Evaluation> = new Array<Evaluation>();
        this.evaluations.forEach(evaluation => {
            if (evaluation.mesured.id == user.id && 
                evaluation.cycle.name.toUpperCase().search(search) > -1 &&
                evaluation.cycle.status.id == 1) {
                    result.push(evaluation);
                }
        });
        return result;
    }

    getEvaluationById(id: string): Evaluation {
        let result: Evaluation;
        this.evaluations.forEach(evaluation => {
            if (evaluation.id == id) {
                result = evaluation;
            }
        });

        return result;
    }

    updateEvaluation(evaluation: Evaluation) {
       for(let i = 0; i < this.evaluations.length; i++) {
           if (this.evaluations[i].id == evaluation.id) {
               this.evaluations[i] = evaluation;
           }
       }
    }

    getIdpNextId(): number {
        this.idpId++;
        return this.idpId;
    }
}