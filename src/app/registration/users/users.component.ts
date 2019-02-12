import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  userList: User[];

  constructor(private usersService: UsersService, private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  onSearch(f: NgForm) {
    if (f.value.active == true) {
      this.userList = this.usersService.getActiveUsersByName(f.value.search);
    }
    else if (f.value.active == false || f.value.active == '') {
      this.userList = this.usersService.getUsersByName(f.value.search);
    }  
  }

  onEdit(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  onCreate() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  

}
