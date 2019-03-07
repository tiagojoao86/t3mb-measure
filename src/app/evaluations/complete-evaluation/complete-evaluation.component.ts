import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageSended } from 'src/app/message-service/message-sended';
import { MessageService } from 'src/app/message-service/message.service';
import { Evaluation } from '../evaluation';
import { EvaluationsService } from '../evaluations.service';
import { Idp } from 'src/app/registration/evaluations/evaluation-type/idp';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-complete-evaluation',
  templateUrl: './complete-evaluation.component.html',
  styleUrls: ['./complete-evaluation.component.css']
})
export class CompleteEvaluationComponent implements OnInit {

  
  evaluation: Evaluation;
  evaluationForm: FormGroup = new FormGroup({});
  typeAcess: number;

  static OWN = 1;
  static SUPERIOR = 2;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private evaluationsService: EvaluationsService,
    private route: ActivatedRoute,     
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.evaluation = this.evaluationsService.getEvaluationById(params['id']);
        }
    );
    if (this.authService.getLoggedUser() == this.evaluation.mesured) {
      this.typeAcess = CompleteEvaluationComponent.OWN;
    }
    else {
      if (this.authService.getLoggedUser() == this.evaluation.mesurer) {
        this.typeAcess = CompleteEvaluationComponent.SUPERIOR;
      }
    }
    this.initForm();
  }

  initForm() {
    let concepts: FormArray = this.formBuilder.array([]);
    this.evaluation.evaluationType.concepts.forEach(concept => {
      concepts.push(this.formBuilder.group({
        id: [{value: concept.id, disabled: true}],
        description: [{value: concept.description, disabled: true}],
        hint: [{value: concept.hint, disabled: true}],
        ownNote: [concept.own],
        superiorNote: [concept.superior],
        agreementNote: [concept.agreement],
        ownJustify: [concept.ownJustify]
      }));
    });

    concepts.controls.forEach(concept => {
      if (this.evaluation.status == Evaluation.AUTO) {
        concept.get('ownNote').setValidators([Validators.min(1), Validators.max(4), Validators.required]);
        concept.get('ownJustify').setValidators([Validators.required]);
      }
      if (this.evaluation.status == Evaluation.SUPERIOR) {
        concept.get('ownNote').disable();
        concept.get('ownJustify').disable();
        concept.get('superiorNote').setValidators([Validators.min(1), Validators.max(4), Validators.required]);
      }
      if (this.evaluation.status == Evaluation.AGREEMENT) {
        concept.get('ownNote').disable();
        concept.get('superiorNote').disable();
        concept.get('agreementNote').setValidators([Validators.min(1), Validators.max(4), Validators.required]);
      }
    });

    let idps: FormArray = this.formBuilder.array([]);
    this.evaluation.evaluationType.idps.forEach(idp => {
      idps.push(this.formBuilder.group({
        id: [{value: idp.id, disabled: true}],
        description: [idp.description],
        deadLine: [formatDate(idp.deadLine, 'yyyy-MM-dd', 'pt-BR')],
      }));
    });

    this.evaluationForm = this.formBuilder.group({
      mesured: [{value: this.evaluation.mesured.name, disabled: true}],
      mesurer: [{value: this.evaluation.status == Evaluation.AUTO ? this.evaluation.mesured.name : 
        this.evaluation.mesurer.name, disabled: true}],
      description: [{value: this.evaluation.evaluationType.description, disabled: true}],
      concepts: concepts,
      idps: idps
    });
  }

  getConceptsControl() {
    return (<FormArray>this.evaluationForm.get('concepts')).controls;
  }

  getIdpsControl() {
    return (<FormArray>this.evaluationForm.get('idps')).controls;
  }

  showHint(id: number) {
    this.messageService.showMessage(new MessageSended(this.getConceptsControl()[id].get('hint').value, 'Informação'));
  }

  onSubmit() {    
    this.saveNotes();
    this.evaluation.nextStatus();
    this.evaluationsService.updateEvaluation(this.evaluation);
    this.messageService.showMessage(new MessageSended('Avaliação Salva com Sucesso', 'Informação'));
    this.goExit();
  }

  onSave() {
    this.saveNotes();    
    this.evaluationsService.updateEvaluation(this.evaluation);
    this.messageService.showMessage(new MessageSended('Avaliação Salva com Sucesso', 'Informação'));
  }

  saveNotes() {
    this.getConceptsControl().forEach(conceptForm => {
      this.evaluation.evaluationType.concepts.forEach(concept => {
        if (conceptForm.get('id').value == concept.id) {
          if (this.evaluation.status == Evaluation.AUTO) {
            concept.own = conceptForm.get('ownNote').value;
            concept.ownJustify = conceptForm.get('ownJustify').value;
          }
          if (this.evaluation.status == Evaluation.SUPERIOR) {
            concept.superior = conceptForm.get('superiorNote').value;
          }
          if (this.evaluation.status == Evaluation.AGREEMENT) {
            concept.agreement = conceptForm.get('agreementNote').value;
          }
        }
      })
    });
    let idpsList: Array<Idp> = new Array<Idp>();
    this.getIdpsControl().forEach(idpForm => {
      idpsList.push(new Idp(
        idpForm.get('id').value,
        idpForm.get('description').value,
        idpForm.get('deadLine').value
      ));
    });
    this.evaluation.evaluationType.idps = idpsList;
  }

  onCancel() {
    this.goExit();       
  }

  goExit() {
    if (this.typeAcess == CompleteEvaluationComponent.OWN) {
      this.evaluation = null;
      this.router.navigate(['/evaluations/my-evaluations']);
    } 
  }

  onAddIdp() {
    this.getIdpsControl().push(this.formBuilder.group({
      id: [{value: this.evaluationsService.getIdpNextId(), disabled: true}],
      description: [''],
      deadLine: [''],
    }));
  }

  onDeleteIdp(index: number) {
    this.getIdpsControl().splice(index,1);
  }
}
