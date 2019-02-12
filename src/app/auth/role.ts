import { SysFunction } from "./sysfunction";

export class Role {
    name: string;
    id: number;
    sysFunctions: Array<SysFunction>;

    constructor(name: string, id: number, sysFunctions: Array<SysFunction>) {
        this.name = name;
        this.id = id;
        this.sysFunctions = sysFunctions;
    }

    
}

