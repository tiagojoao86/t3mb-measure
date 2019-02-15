import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'src/app/message-service/message.service';
import { EvaluationTypeService } from '../evaluation-type.service';
import { EvaluationType } from '../evaluation-type';

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
    
  }

  onCancel() {
   
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
    
    
  }

  onDeleteConcept(i: number) {
    (<FormArray>this.evaluationTypeForm.get('concepts')).controls.splice(i,1);
  }

  onAddConcept(i: number) {
    (<FormArray>this.evaluationTypeForm.get('concepts')).controls.splice(i+1,0,
      new FormGroup({
        'id': new FormControl({value: null, disabled: true}, Validators.required),
        'description': new FormControl(null, Validators.required),
        'hint': new FormControl(null, Validators.required),
        'weight': new FormControl(null, Validators.required),
      }));
  }

  getControls() {
    return (<FormArray>this.evaluationTypeForm.get('concepts')).controls;
  }

}
