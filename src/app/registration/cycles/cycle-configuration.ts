import { EvaluationType } from '../evaluations/evaluation-type/evaluation-type';
import { UserGroup } from '../users/user';

export class CycleConfiguration {
    id: number;
    evaluationType: EvaluationType;
    userGroup: UserGroup;

    constructor(id: number, evaluationType: EvaluationType, userGroup: UserGroup) {
        this.id = id;
        this.evaluationType = evaluationType;
        this.userGroup = userGroup;
    }
}