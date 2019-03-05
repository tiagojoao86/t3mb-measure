import { CycleStatus } from './cycleStatus';
import { UserGroup } from '../users/user';
import { EvaluationType } from '../evaluations/evaluation-type/evaluation-type';
import { CycleConfiguration } from './cycle-configuration';

export class Cycle {
    id: number;
    name: string;
    startDate: Date;
    status: CycleStatus;
    configurations: Array<CycleConfiguration> = new Array<CycleConfiguration>();

    constructor(id: number, name:string, startDate: Date, status: CycleStatus){
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.status = status;
        this.configurations = new Array<CycleConfiguration>();
    }
}