import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Evaluation } from '../evaluation';
import { EvaluationsService } from '../evaluations.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-evaluated',
  templateUrl: './my-evaluated.component.html',
  styleUrls: ['./my-evaluated.component.css']
})
export class MyEvaluatedComponent implements OnInit {

  searchForm: FormGroup;
  evaluations: Array<Evaluation> = new Array<Evaluation>();

  constructor(private formBuilder: FormBuilder,
    private evaluationService: EvaluationsService, 
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    this.formInit();
    
  }

  formInit() {
    this.searchForm = this.formBuilder.group({
      description: [''],
      inProgress: [true]
    });
  }

  onSearch() {
    if (this.searchForm.get('inProgress').value == false) {
      this.evaluations = this.evaluationService.getMyEvaluated(this.authService.getLoggedUser(), 
        this.searchForm.get('description').value);
    }
    else {
      this.evaluations = this.evaluationService.getInProgressMyEvaluated(this.authService.getLoggedUser(),
        this.searchForm.get('description').value);
    }
    console.log(this.evaluations);
  }

  onFill(evaluationId: string) {
    this.router.navigate(['complete-evaluation/'+evaluationId], {relativeTo: this.route.parent});
  }
}
