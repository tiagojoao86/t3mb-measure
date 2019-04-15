import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './user';
import { Response } from '../../response'
import { MessageService } from 'src/app/message-service/message.service';
import { MessageSended } from 'src/app/message-service/message-sended';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  userList: User[];
  checked: boolean = true;

  constructor(private usersService: UsersService, private router: Router,
                private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    
  }

  onSearch(f: NgForm) {
    if (f.value.active == true) {
      this.usersService.getActiveUsersByName(f.value.search).toPromise()
        .then((response: Response) => {
          this.userList = response.data;
          return this.userList;
        })
        .catch(error => {
          this.messageService.showMessage(new MessageSended(['Não foi possível carregar a lista de usuários'],'Erro'))
        });
    }
    else if (f.value.active == false || f.value.active == '') {
      this.userList = this.usersService.getUsersByName(f.value.search);
    } 
  }

  onEdit(id: number) {
    this.userList.forEach(user => {
      if (user.id === id) {
        this.usersService.setEditUser(user);
      }
    });
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onCreate() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  

}
