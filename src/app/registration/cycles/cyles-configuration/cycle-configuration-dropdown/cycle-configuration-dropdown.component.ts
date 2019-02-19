import { Component, OnInit, Input } from '@angular/core';
import { UserGroup } from 'src/app/registration/users/user';
import { EvaluationType } from 'src/app/registration/evaluations/evaluation-type/evaluation-type';
import { UsersService } from 'src/app/registration/users/users.service';
import { EvaluationTypeService } from 'src/app/registration/evaluations/evaluation-type/evaluation-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CyclesService } from '../../cycles.service';

@Component({
  selector: 'app-cycle-configuration-dropdown',
  templateUrl: './cycle-configuration-dropdown.component.html',
  styleUrls: ['./cycle-configuration-dropdown.component.css']
})
export class CycleConfigurationDropdownComponent implements OnInit {

  @Input() configuration:{userGroup: UserGroup, evaluationType: EvaluationType};  
  @Input() index: number;
  userGroups: Array<UserGroup> = new Array<UserGroup>();
  evaluationTypes: Array<EvaluationType> = new Array<EvaluationType>();

  dropdownForm: FormGroup;

  constructor(private usersService: UsersService, 
    private evaluationTypeService: EvaluationTypeService,
    private cyclesService: CyclesService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userGroups = this.usersService.getUsersGroup();
    this.evaluationTypes = this.evaluationTypeService.getEvaluationTypes();
    this.initForm();
  }

  initForm() {
    this.dropdownForm = this.formBuilder.group({
      userGroups: [this.configuration.userGroup, Validators.required],
      evaluationTypes: [this.configuration.evaluationType, Validators.required]
    });
  };

  onChangeUserGroup(id: number) {
    let data = {id: id, index: this.index, type: 1};
    this.cyclesService.updateConfiguration.next(data);
  }

  onChangeEvaluationType(id: number) {
    let data = {id: id, index: this.index, type: 2};
    this.cyclesService.updateConfiguration.next(data);
  }

  onRemoveConfiguration() {
    this.cyclesService.removeConfiguration.next(this.index);
  }

}
