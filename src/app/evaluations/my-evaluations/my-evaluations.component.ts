import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Evaluation } from '../evaluation';
import { EvaluationsService } from '../evaluations.service';

@Component({
  selector: 'app-my-evaluations',
  templateUrl: './my-evaluations.component.html',
  styleUrls: ['./my-evaluations.component.css']
})
export class MyEvaluationsComponent implements OnInit {

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
      this.evaluations = this.evaluationService.getMyEvaluations(this.authService.getLoggedUser(), 
        this.searchForm.get('description').value);
    }
    else {
      this.evaluations = this.evaluationService.getInProgressMyEvaluations(this.authService.getLoggedUser(),
        this.searchForm.get('description').value);
    }
    
  }

  onFill(evaluationId: string) {
    this.router.navigate(['complete-evaluation/'+evaluationId], {relativeTo: this.route.parent});
  }

}
