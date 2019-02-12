export class Concept {
    id: number;
    description: string;
    hint: string;
    weight: number;
    own: number = 0;
    superior: number = 0;
    agreement: number = 0;

    constructor(id: number, description: string, hint: string, weight: number) {
        this.id = id;
        this.description = description;
        this.hint = hint;
        this.weight = weight;
    }

}

