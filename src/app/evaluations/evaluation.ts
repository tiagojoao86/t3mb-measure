import { Cycle } from '../registration/cycles/cycle';
import { EvaluationType } from '../registration/evaluations/evaluation-type/evaluation-type';
import { User } from '../registration/users/user';

export class Evaluation {
    id: string;
    evaluationType: EvaluationType;
    cycle: Cycle;
    measured: User;
    measurer: User;
    status: {id: number, description: string};

    static AUTO = {id: 1, description: 'Auto-Avaliação'};
    static SUPERIOR = {id: 2, description: 'Avaliação do Superior'};
    static AGREEMENT = {id: 3, description: 'Reunião de Consenso'};
    static FINISH = {id: 4, description: 'Finalizado'};

    constructor(id: string, evaluationType: EvaluationType, cycle: Cycle, measured: User, measurer: User, status) {
        this.id = id;
        this.evaluationType = evaluationType;
        this.cycle = cycle;
        this.measured = measured;
        this.measurer = measurer;
        this.status = status;
    }

    nextStatus() {
        if (this.status == Evaluation.AUTO) {
            this.status = Evaluation.SUPERIOR;
        }else {
            if (this.status == Evaluation.SUPERIOR) {
                this.status = Evaluation.AGREEMENT;
            }
            else {
                if (this.status == Evaluation.AGREEMENT) {
                    this.status = Evaluation.FINISH;
                }
            }
        }
        
        
    }
}