import { Concept } from './concept';

export class EvaluationType {
    id: number;
    description: string;
    concepts: Array<Concept> = new Array<Concept>();


    constructor(id: number, description: string) {
        this.id = id;
        this.description = description;
    }

    addQuestion(concept: Concept) {
        this.concepts.push(concept);
    }

    addQuestions(concepts: Array<Concept>) {
        this.concepts = concepts;
    }

    removeQuestion(concept: Concept) {
        let index: number = this.concepts.indexOf(concept);
        if (index != -1) {
            this.concepts.splice(index);
        }
    }

    setMeasuredAnswer(concept: Concept, answer: number) {
        let index: number = this.concepts.indexOf(concept);
        if (index != -1) {
            this.concepts[index].own = answer;
        }            
    }

    setMeasurerAnswer(concept: Concept, answer: number) {
        let index: number = this.concepts.indexOf(concept);
        if (index != -1) {
            this.concepts[index].superior = answer;
        }  
    }
    
    setAgreementAnswer(concept: Concept, answer: number) {
        let index: number = this.concepts.indexOf(concept);
        if (index != -1) {
            this.concepts[index].agreement = answer;
        } 
    }

    getMesuredTotal(): number {
        let result: number = 0;
        this.concepts.forEach(element => {
            result += (element.own * element.weight);
        });
        return result;
    }

    getMesurerTotal(): number {
        let result: number = 0;
        this.concepts.forEach(element => {
            result += (element.superior * element.weight);
        });
        return result;
    }

    getAgreementTotal(): number {
        let result: number = 0;
        this.concepts.forEach(element => {
            result += (element.agreement * element.weight);
        });
        return result;
    } 

    toString() {
        return '('+this.id+') '+this.description;
    }

}