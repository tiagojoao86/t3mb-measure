import { Component, OnInit } from '@angular/core';
import { EvaluationType } from './evaluation-type';
import { EvaluationTypeService } from './evaluation-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-evaluation-type',
  templateUrl: './evaluation-type.component.html',
  styleUrls: ['./evaluation-type.component.css']
})
export class EvaluationTypeComponent implements OnInit {

  evaluationsList: Array<EvaluationType> = new Array<EvaluationType>();

  constructor(private evaluationTypeService: EvaluationTypeService, private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  onSearch(f: NgForm) {
    this.evaluationsList = this.evaluationTypeService.getEvaluationsTypeByDescription(f.value.search);
  }

  onEdit(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  onCreate() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
