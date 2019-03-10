import { Component, OnInit } from '@angular/core';
import { Cycle } from '../cycle';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CyclesService } from '../cycles.service';
import { MessageService } from 'src/app/message-service/message.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MessageSended } from 'src/app/message-service/message-sended';
import { formatDate } from '@angular/common';
import { CycleStatus } from '../cycleStatus';

@Component({
  selector: 'app-cycles-edit',
  templateUrl: './cycles-edit.component.html',
  styleUrls: ['./cycles-edit.component.css']
})
export class CyclesEditComponent implements OnInit {

  cycle: Cycle = null;
  cycleForm : FormGroup;
  editMode: boolean = false;
  selectedStatus: CycleStatus;  

  constructor(private cyclesService: CyclesService, 
    private messageService: MessageService,
    private route: ActivatedRoute,     
    private router: Router) { }

  ngOnInit() {
    this.selectedStatus = this.cyclesService.getCycleStatusById(1);
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== 'new') {
            this.cycle = this.cyclesService.getCycleById(+params['id']);
            this.editMode = true;
          }
          else {
            this.cycle = new Cycle(this.cyclesService.getNextId(),'', 
                                  new Date(), this.cyclesService.getCycleStatusById(1));
            this.editMode = false;
          }          
        }
    );
    this.initForm();
  }

  onSubmit (){
    let cycle: Cycle = new Cycle(
      this.cycleForm.getRawValue().id,
      this.cycleForm.value['name'],
      this.cycleForm.value['startDate'],
      this.selectedStatus
    );
    if (this.editMode) {
      this.cyclesService.updateCycle(cycle);
      this.messageService.showMessage(new MessageSended(['Ciclo alterado com sucesso'], 'Informação'));
    }
    else {
      this.cyclesService.addCycle(cycle);
      this.messageService.showMessage(new MessageSended(['Ciclo cadastrado com sucesso'], 'Informação'));
    }
    
    this.router.navigate(['/registration/cycles']);
  }

  onCancel() {
    this.cycle = null;
    this.router.navigate(['/registration/cycles']);
  }

  initForm() {
    if (this.editMode) {
      this.selectedStatus = this.cycle.status;
      this.cycleForm = new FormGroup({
        'id': new FormControl({value: this.cycle.id, disabled: true }, Validators.required),
        'name': new FormControl(this.cycle.name, Validators.required),
        'startDate': new FormControl(formatDate(this.cycle.startDate, 'yyyy-MM-dd', 'pt-BR'), Validators.required),
        'status': new FormControl(this.selectedStatus,Validators.required)
      });

      if (this.cycle.status.id == 2) {
        this.cycleForm.disable();
      }
      
    }
    else {
      this.cycleForm = new FormGroup({
        'id': new FormControl({value: this.cycle.id, disabled: true}, Validators.required),
        'name': new FormControl(this.cycle.name, Validators.required),
        'startDate': new FormControl(formatDate(this.cycle.startDate, 'yyyy-MM-dd', 'pt-BR'), Validators.required),
        'status': new FormControl(this.selectedStatus, Validators.required)
      });
    }

    
  }

  onChangeStatus(statusId: number) {
    this.selectedStatus = this.cyclesService.getCycleStatusById(statusId);    
  }
}
