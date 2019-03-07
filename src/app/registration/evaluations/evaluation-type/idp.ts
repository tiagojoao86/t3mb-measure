export class Idp {
    id: number;
    description: string;
    deadLine: Date;

    constructor(id: number, description: string, deadLine: Date) {
        this.id = id;
        this.description = description;
        this.deadLine = deadLine;
    }
}