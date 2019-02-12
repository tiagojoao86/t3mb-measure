import { Injectable } from '@angular/core';
import { Concept } from './concept';
import { EvaluationType } from './evaluation-type';
import { UsersService } from '../../users/users.service';

@Injectable()
export class EvaluationTypeService {    

    concepts: Array<Concept> = new Array<Concept>(
        new Concept(1,'Pro-Atividade', 'Considerar Pró-Atividade do Colaborador', 1),
        new Concept(2,'Qualidade do trabalho executado', 'Considerar a qualidade das entregas', 1),
        new Concept(3,'Pontualidade', 'Considerar a pontualidade', 1),
        new Concept(4,'Maturidade', 'Considerar a maturidade', 1),
    );

    evaluationsType: Array<EvaluationType> = new Array<EvaluationType>(
        new EvaluationType(1,"Avaliação Recepcionistas")
    );

    constructor(private usersService: UsersService) {
        this.evaluationsType[0].addQuestions(this.concepts);
    }

    addEvaluationType(evaluationType: EvaluationType) {
        this.evaluationsType.push(evaluationType);
    }

    updateEvaluationType(evaluationType: EvaluationType) {
       for (let i = 0; i < this.evaluationsType.length; i++) {
           if (this.evaluationsType[i].id == evaluationType.id) {
               this.evaluationsType[i] = evaluationType;
           }
       }
    }

    getEvaluationsTypeByDescription(description: string): Array<EvaluationType> {
        let result: Array<EvaluationType> = new Array<EvaluationType>();

        this.evaluationsType.forEach(element => {
            if (element.description.toUpperCase().search(description.toUpperCase()) > -1) {
                result.push(element);
            }
        })

        return result;
    }

    getEvaluationTypeById(id: number) {
        let result: EvaluationType;

        this.evaluationsType.forEach(element => {
            if (element.id == id) {
                result = element;
            }
        })

        return result;
    }


}