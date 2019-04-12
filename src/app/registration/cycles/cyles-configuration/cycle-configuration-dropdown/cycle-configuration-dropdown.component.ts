import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserGroup } from 'src/app/registration/users/user';
import { EvaluationType } from 'src/app/registration/evaluations/evaluation-type/evaluation-type';
import { UsersService } from 'src/app/registration/users/users.service';
import { EvaluationTypeService } from 'src/app/registration/evaluations/evaluation-type/evaluation-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CyclesService } from '../../cycles.service';
import { Cycle } from '../../cycle';
import { CycleConfiguration } from '../../cycle-configuration';

@Component({
  selector: 'app-cycle-configuration-dropdown',
  templateUrl: './cycle-configuration-dropdown.component.html',
  styleUrls: ['./cycle-configuration-dropdown.component.css']
})
export class CycleConfigurationDropdownComponent implements OnInit {

  @Input() configuration: CycleConfiguration;;  
  @Input() index: number;
  @Input() statusId: number;
  @Output() updateConfiguration = new EventEmitter<{id: number, index: number, type: number}>();
  @Output() removeConfiguration = new EventEmitter<{index: number}>();
  userGroups: Array<UserGroup> = new Array<UserGroup>();
  evaluationTypes: Array<EvaluationType> = new Array<EvaluationType>();

  dropdownForm: FormGroup;

  constructor(private usersService: UsersService, 
    private evaluationTypeService: EvaluationTypeService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    //this.userGroups = this.usersService.getUsersGroup(); - CORRIGIR
    this.evaluationTypes = this.evaluationTypeService.getEvaluationTypes();
    this.initForm();
  }

  initForm() {
    this.dropdownForm = this.formBuilder.group({
      id: [{value: this.configuration.id, disabled: true}],
      userGroups: [this.configuration.userGroup, Validators.required],
      evaluationTypes: [this.configuration.evaluationType, Validators.required]
    });
    if (this.statusId == 2) {
      this.dropdownForm.disable();
    }   
  };

  onChangeUserGroup(id: number) {
    let data = {id: id, index: this.index, type: 1};
    this.updateConfiguration.emit(data);
  }

  onChangeEvaluationType(id: number) {
    let data = {id: id, index: this.index, type: 2};
    this.updateConfiguration.emit(data);
  }

  onRemoveConfiguration() {
    let data = {index: this.index};
    this.removeConfiguration.emit(data);
  }

}
