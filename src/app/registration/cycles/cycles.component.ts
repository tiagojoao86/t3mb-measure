import { Component, OnInit } from '@angular/core';
import { Cycle } from './cycle';
import { CyclesService } from './cycles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css']
})
export class CyclesComponent implements OnInit {

  cyclesList: Cycle[];

  constructor(private cyclesService: CyclesService, private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  onSearch(f: NgForm) {
    this.cyclesList = this.cyclesService.getCyclesByName(f.value.search);
  }

  onEdit(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  onCreate() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
