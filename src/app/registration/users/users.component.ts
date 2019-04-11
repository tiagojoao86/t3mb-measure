import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './user';
import { Response } from '../../response'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  userList: User[];
  checked: boolean = true;

  constructor(private usersService: UsersService, private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  onSearch(f: NgForm) {
    if (f.value.active == true) {
      console.log("Entrou no if");
      this.usersService.getActiveUsersByName(f.value.search).toPromise()
        .then((response: Response) => {
          console.log(response);
          this.userList = response.data;
          console.log(this.userList);
          return this.userList;
        })
        .catch();
      //getActiveUsersByName(f.value.search)
    }
    else if (f.value.active == false || f.value.active == '') {
      this.userList = this.usersService.getUsersByName(f.value.search);
    } 
    
    console.log(this.userList);
  }

  onEdit(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  onCreate() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  

}
