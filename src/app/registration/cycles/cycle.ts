import { CycleStatus } from './cycleStatus';
import { UserGroup } from '../users/user';
import { EvaluationType } from '../evaluations/evaluation-type/evaluation-type';

export class Cycle {
    id: number;
    name: string;
    startDate: Date;
    status: CycleStatus;
    configurations: {userGroup: UserGroup, evaluationType: EvaluationType}[];

    constructor(id: number, name:string, startDate: Date, status: CycleStatus){
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.status = status;
    }

    

   
}