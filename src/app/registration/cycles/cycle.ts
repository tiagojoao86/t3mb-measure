import { CycleStatus } from './cycleStatus';

export class Cycle {
    id: number;
    name: string;
    startDate: Date;
    status: CycleStatus;

    constructor(id: number, name:string, startDate: Date, status: CycleStatus){
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.status = status;
    }

    

   
}