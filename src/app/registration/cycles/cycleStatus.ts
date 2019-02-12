export class CycleStatus {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public equals(obj: Object) : boolean { 
        let result = false;
        if (obj instanceof CycleStatus){
            if (obj.id = this.id) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    } 

    public toString() {
        return '('+this.id+') '+this.name;
    }
}