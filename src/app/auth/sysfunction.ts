export class SysFunction {
    name: string;
    id: number;
    url: string;
    subFunctions: Array<SysFunction>;

    constructor(name: string, id: number, url: string, subFunctions: Array<SysFunction>) {
        this.name = name;
        this.id = id;
        this.url = url;
        this.subFunctions = subFunctions;
    }
}