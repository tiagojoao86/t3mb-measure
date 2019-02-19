import { Injectable } from '@angular/core';
import { Concept } from './concept';
import { EvaluationType } from './evaluation-type';
import { UsersService } from '../../users/users.service';

@Injectable()
export class EvaluationTypeService {
    
    conceptId: number = 0;
    evaluationTypeId: number = 0;

    concepts: Array<Concept> = new Array<Concept>(
        new Concept(this.getNextConceptId(),'Pro-Atividade', 'Considerar Pró-Atividade do Colaborador', 1),
        new Concept(this.getNextConceptId(),'Qualidade do trabalho executado', 'Considerar a qualidade das entregas', 1),
        new Concept(this.getNextConceptId(),'Pontualidade', 'Considerar a pontualidade', 1),
        new Concept(this.getNextConceptId(),'Maturidade', 'Considerar a maturidade', 1),
    );

    evaluationTypes: Array<EvaluationType> = new Array<EvaluationType>(
        new EvaluationType(this.getNextEvaluationTypeId(),"Avaliação Recepcionistas")
    );

    constructor(private usersService: UsersService) {
        this.evaluationTypes[0].addQuestions(this.concepts);
    }

    addEvaluationType(evaluationType: EvaluationType) {
        this.evaluationTypes.push(evaluationType);
    }

    updateEvaluationType(evaluationType: EvaluationType) {
       for (let i = 0; i < this.evaluationTypes.length; i++) {
           if (this.evaluationTypes[i].id == evaluationType.id) {
               this.evaluationTypes[i] = evaluationType;
           }
       }
    }

    getEvaluationsTypeByDescription(description: string): Array<EvaluationType> {
        let result: Array<EvaluationType> = new Array<EvaluationType>();

        this.evaluationTypes.forEach(element => {
            if (element.description.toUpperCase().search(description.toUpperCase()) > -1) {
                result.push(element);
            }
        })

        return result;
    }

    getEvaluationTypeById(id: number) {
        let result: EvaluationType;

        this.evaluationTypes.forEach(element => {
            if (element.id == id) {
                result = element;
            }
        })

        return result;
    }

    getNextConceptId(): number {
        this.conceptId++;
        return this.conceptId;
    }

    getNextEvaluationTypeId(): number {
        this.evaluationTypeId++;
        return this.evaluationTypeId;
    }

    getEvaluationTypes(): Array<EvaluationType> {
        return this.evaluationTypes;
    }


}