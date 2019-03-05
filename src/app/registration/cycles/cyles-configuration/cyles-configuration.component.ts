import { Component, OnInit, OnDestroy } from '@angular/core';
import { CyclesService } from '../cycles.service';
import { MessageService } from 'src/app/message-service/message.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Cycle } from '../cycle';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { UsersService } from '../../users/users.service';
import { UserGroup } from '../../users/user';
import { EvaluationType } from '../../evaluations/evaluation-type/evaluation-type';
import { EvaluationTypeService } from '../../evaluations/evaluation-type/evaluation-type.service';
import { MessageSended } from 'src/app/message-service/message-sended';
import { CycleConfiguration } from '../cycle-configuration';

@Component({
  selector: 'app-cyles-configuration',
  templateUrl: './cyles-configuration.component.html',
  styleUrls: ['./cyles-configuration.component.css']
})
export class CylesConfigurationComponent implements OnInit, OnDestroy {

  cycle: Cycle = null;
  configurations: Array<CycleConfiguration> = new Array<CycleConfiguration>();
  configurationForm: FormGroup;

  constructor(private cyclesService: CyclesService, 
    private messageService: MessageService,
    private route: ActivatedRoute,     
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private evaluationTypeService: EvaluationTypeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {                   
          this.cycle = this.cyclesService.getCycleById(+params['id']);
        }
    );
    this.configurations = this.cycle.configurations.slice();
    this.initForm();
  }

  ngOnDestroy() {
  }

  initForm() {
    this.configurationForm = this.formBuilder.group({});
    if (this.cycle.status.id == 2) {
      this.configurationForm.disable();
    }
  }

  onAddConfiguration() {
    this.configurations.push(new CycleConfiguration(this.cyclesService.getNextCycleConfigurationId(),null,null));
  }

  onCancel() {
    this.cycle = null;
    this.router.navigate(['/registration/cycles']);
  }

  onSubmit() {
    if (this.cycle.status.id == 1) {
      this.messageService.showMessage(new MessageSended('Configurações salvas com sucesso.', 'Informação'));
      this.cycle.configurations = this.configurations;
      this.cyclesService.updateCycle(this.cycle);
      this.router.navigate(['/registration/cycles']);
    }
    else {
      if (this.cycle.status.id == 2) {
        this.messageService.showMessage(new MessageSended('Você não pode alterar um ciclo encerrado.', 'Informação')); 
      }
    }
    
  }

  onUpdateConfiguration(data: {id: number, index: number, type: number}) {
    if (data.type == 1) {
      this.configurations[data.index].userGroup = this.usersService.getGroupById(data.id);
    }
    if (data.type == 2) {
      this.configurations[data.index].evaluationType = this.evaluationTypeService.getEvaluationTypeById(data.id);
    }
  }

  onRemoveConfiguration(data: {index: number}) {
    this.configurations.splice(data.index, 1);
  }
}
