import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/auth/role';
import { User, UserGroup } from 'src/app/registration/users/user';
import { MessageSended } from 'src/app/message-service/message-sended';
import { RolesService } from 'src/app/roles/roles.service';
import { UsersService } from '../users.service';
import { MessageService } from 'src/app/message-service/message.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = null;
  userForm : FormGroup;
  editMode: boolean = false;
  selectedGroup: UserGroup;

  

  constructor(private usersService: UsersService, 
    private rolesService: RolesService, 
    private messageService: MessageService,
    private route: ActivatedRoute,     
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== 'new') {
            this.user = this.usersService.getUserById(+params['id']);
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
    let newRoles: Array<Role> = new Array<Role>();
    if (this.userForm.value['1'] == true){
      newRoles.push(this.rolesService.getRoleById(1));
    }
    if (this.userForm.value['2'] == true){
      newRoles.push(this.rolesService.getRoleById(2));
    }
    if (this.userForm.value['3'] == true){
      newRoles.push(this.rolesService.getRoleById(3));
    }
    let user: User = new User(
      this.userForm.getRawValue().id,
      this.userForm.value['name'],
      this.userForm.value['login'],
      this.userForm.value['password'],
      newRoles,
      this.selectedGroup,
      this.userForm.value['A'] ? 'A' : 'I' 
    );
    if (this.editMode) {
      this.usersService.updateUser(user);
      this.messageService.showMessage(new MessageSended('Usuario alterado com sucesso', 'Informação'));
    }
    else {
      this.usersService.addUser(user);
      this.messageService.showMessage(new MessageSended('Usuario cadastrado com sucesso', 'Informação'));
    }
    
    this.router.navigate(['/registration/users']);
  }

  onCancel() {
    this.user = null;
    this.router.navigate(['/registration/users']);
  }

  initForm() {
    console.log(this.user);
    if (this.editMode) {
      this.selectedGroup = this.user.userGroup;
      this.userForm = new FormGroup({
        'id': new FormControl({value: this.user.id, disabled: true }, Validators.required),
        'login': new FormControl(this.user.login, Validators.required),
        'name': new FormControl(this.user.name, Validators.required),
        'password': new FormControl(this.user.password, Validators.required),
        '1': new FormControl(this.user.isRolePresent(1)),
        '2': new FormControl(this.user.isRolePresent(2)),
        '3': new FormControl(this.user.isRolePresent(3)),
        'A': new FormControl(this.user.isActive()),
        'userGroup': new FormControl(this.selectedGroup, Validators.required)
      });
    }
    else {
      this.userForm = new FormGroup({
        'id': new FormControl({value: this.usersService.getNextId(), disabled: true}, Validators.required),
        'login': new FormControl('', Validators.required),
        'name': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
        '1': new FormControl(false),
        '2': new FormControl(false),
        '3': new FormControl({value: true}),
        'A': new FormControl(this.user.isActive()),
        'userGroup': new FormControl(this.selectedGroup, Validators.required)
      });
    }
    
  }

  onChangeGroup(id: number) {
    this.selectedGroup = this.usersService.getGroupById(id);
  }

}
