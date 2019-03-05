export class Concept {
    id: number;
    description: string;
    hint: string;
    weight: number;
    own: number = 0;
    superior: number = 0;
    agreement: number = 0;
    ownJustify: string;

    constructor(id: number, description: string, hint: string, weight: number) {
        this.id = id;
        this.description = description;
        this.hint = hint;
        this.weight = weight;
        this.own = 0;
        this.superior = 0;
        this.agreement = 0; 
        this.ownJustify = '';       
    }

}

