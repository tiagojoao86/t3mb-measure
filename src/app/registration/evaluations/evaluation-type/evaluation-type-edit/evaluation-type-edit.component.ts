import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'src/app/message-service/message.service';
import { EvaluationTypeService } from '../evaluation-type.service';
import { EvaluationType } from '../evaluation-type';
import { Concept } from '../concept';
import { MessageSended } from 'src/app/message-service/message-sended';

@Component({
  selector: 'app-evaluation-type-edit',
  templateUrl: './evaluation-type-edit.component.html',
  styleUrls: ['./evaluation-type-edit.component.css']
})
export class EvaluationTypeEditComponent implements OnInit {

  evaluationType: EvaluationType = null;
  evaluationTypeForm : FormGroup;
  editMode: boolean = false;

  

  constructor(private evaluationTypeService: EvaluationTypeService,
    private messageService: MessageService,
    private route: ActivatedRoute,     
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== 'new') {            
            this.evaluationType = this.evaluationTypeService.getEvaluationTypeById(+params['id']);
            this.editMode = true;
          }
          else {
            this.editMode = false;
          }          
        }
    );

    this.initForm();
  }

  onSubmit (){
    let newEvaluationType: EvaluationType = new EvaluationType(
      this.evaluationTypeForm.get('id').value,
      this.evaluationTypeForm.get('description').value
    );
    

    let VALID: boolean = true;
    let newConcepts: Array<Concept> = new Array<Concept>();
    for (let formGroup of this.getControls()) {
      VALID = formGroup.valid;
      let concept: Concept = new Concept(
        formGroup.get('id').value,
        formGroup.get('description').value,
        formGroup.get('hint').value,
        formGroup.get('weight').value
      );
      newConcepts.push(concept);        
    }
    newEvaluationType.concepts = newConcepts;

    if (VALID) {
      if (this.editMode) {
        this.evaluationTypeService.updateEvaluationType(newEvaluationType)
        this.messageService.showMessage(new MessageSended('Tipo de Avaliação alterada com sucesso', 'Informação'));        
      }
      else {
        this.evaluationTypeService.addEvaluationType(newEvaluationType)
        this.messageService.showMessage(new MessageSended('Tipo de Avaliação cadastrada com sucesso', 'Informação'));
      }
      this.router.navigate(['/registration/evaluations-type']);
    }
    else {
      this.messageService.showMessage(new MessageSended('Favor verificar se todos os campos estão preenchidos', 'Erro'));
    }
    
    
  }

  onCancel() {
    this.router.navigate(['/registration/evaluations-type']);
  }

  initForm() {
    let evaluationTypeConcepts = new FormArray([]);
    if (this.editMode) {
      if (this.evaluationType['concepts']) {
        for (let concept of this.evaluationType.concepts) {
          evaluationTypeConcepts.push(
            new FormGroup({
              'id': new FormControl({value: concept.id, disabled: true}, Validators.required),
              'description': new FormControl(concept.description, Validators.required),
              'hint': new FormControl(concept.hint, Validators.required),
              'weight': new FormControl(concept.weight, Validators.required),
            })
          );
        }
      }
      this.evaluationTypeForm = new FormGroup({
        'id': new FormControl({value: this.evaluationType.id, disabled: true }, Validators.required),
        'description': new FormControl(this.evaluationType.description, Validators.required),
        'concepts': evaluationTypeConcepts        
      });
    }
    else {
      this.evaluationTypeForm = new FormGroup({
        'id': new FormControl({value: this.evaluationTypeService.getNextEvaluationTypeId(), disabled: true }, Validators.required),
        'description': new FormControl(null, Validators.required),
        'concepts': evaluationTypeConcepts        
      });
    }
  }

  onDeleteConcept(i: number) {
    (<FormArray>this.evaluationTypeForm.get('concepts')).controls.splice(i,1);
    this.evaluationTypeForm.get('concepts').updateValueAndValidity();
    this.evaluationTypeForm.updateValueAndValidity();
  }

  onAddConcept(i: number) {
    (<FormArray>this.evaluationTypeForm.get('concepts')).controls.splice(i+1,0,
      new FormGroup({
        'id': new FormControl({value: this.evaluationTypeService.getNextConceptId(), disabled: true}, Validators.required),
        'description': new FormControl(null, Validators.required),
        'hint': new FormControl(null, Validators.required),
        'weight': new FormControl(null, Validators.required),
      }));            
  }

  getControls() {
    return (<FormArray>this.evaluationTypeForm.get('concepts')).controls;
  }

}
