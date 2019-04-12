import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Role } from 'src/app/auth/role';
import { User, UserGroup } from 'src/app/registration/users/user';
import { MessageSended } from 'src/app/message-service/message-sended';
import { RolesService } from 'src/app/roles/roles.service';
import { UsersService } from '../users.service';
import { MessageService } from 'src/app/message-service/message.service';
import { Response } from 'src/app/response';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = null;
  userForm : FormGroup = new FormGroup({});
  editMode: boolean = false;
  selectedGroup: UserGroup;
  selectedSuperior: User;
  hasSuperior: boolean;
  superiorsList: Array<User> = new Array<User>();

  

  constructor(private usersService: UsersService, 
    private rolesService: RolesService, 
    private messageService: MessageService,
    private route: ActivatedRoute,     
    private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== 'new') {
            this.usersService.getUserById(+params['id'])
            .subscribe(response => {
              this.user = this.refactoryUser(response.data);
              this.editMode = true;
              this.usersService.getSuperiors()
              .subscribe(response => {
                response.data.forEach(element => {
                  this.superiorsList.push(this.refactoryUser(element));
                });                
                this.initForm();              
              },error => {
                this.messageService.showMessage(new MessageSended(['Erro ao lista de Superiores'],'Erro'));
                console.log(error);
              });
            },error => {
              this.messageService.showMessage(new MessageSended(['Erro ao carregar Usuário'],'Erro'));
              console.log(error);
            }
          );            
          }
          else {
            this.editMode = false;
          }          
        }
    );
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
    if (this.userForm.value['hasSuperior'] == true){
      this.hasSuperior = true;
    } else {
      this.hasSuperior = false;
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
    user.superior = this.selectedSuperior;
    user.hasSuperior = this.hasSuperior;
    if (this.editMode) {
      this.usersService.updateUser(user);
      this.messageService.showMessage(new MessageSended(['Usuario alterado com sucesso'], 'Informação'));
    }
    else {
      this.usersService.addUser(user);
      this.messageService.showMessage(new MessageSended(['Usuario cadastrado com sucesso'], 'Informação'));
    }
    
    this.router.navigate(['/registration/users']);
  }

  onCancel() {
    this.user = null;
    this.router.navigate(['/registration/users']);
  }

  initForm() {
    if (this.editMode) {
      this.selectedGroup = this.user.userGroup;
      this.selectedSuperior = this.user.superior;      
      this.userForm.setValue({
        id: this.user.id,
        login: this.user.login,
        name: this.user.name,
        password: this.user.password,
        1: this.user.isRolePresent(1),
        2: this.user.isRolePresent(2),
        3: this.user.isRolePresent(3),
        A: this.user.isActive(),
        userGroup: this.selectedGroup,
        superior: this.selectedSuperior,
        hasSuperior: this.user.hasSuperior
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
        'userGroup': new FormControl(this.selectedGroup, Validators.required),
        'superior': new FormControl(null),
        'hasSuperior': new FormControl(true)
      });
    }
    
    this.onChangeHasSuperior();
    
  }

  createForm() {
    this.userForm = new FormGroup({
      'id': new FormControl({value: '0', disabled: true}, Validators.required),
      'login': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      '1': new FormControl(false),
      '2': new FormControl(false),
      '3': new FormControl({value: true}),
      'A': new FormControl({value: true}),
      'userGroup': new FormControl(this.selectedGroup, Validators.required),
      'superior': new FormControl(null),
      'hasSuperior': new FormControl(true)
    });
  }

  onChangeGroup(id: number) {
    this.selectedGroup = this.usersService.getGroupById(id);
  }

  onChangeSuperior(id: number) {
    this.superiorsList.forEach(superior => {
      if (superior.id == id) {
        this.selectedSuperior = superior;
      }
    });
  }

  onChangeHasSuperior() {
    if (this.userForm.get('hasSuperior').value == true) {
      this.hasSuperior = true;
      this.userForm.get('superior').enable();
    }
    else {      
      this.hasSuperior = false;
      this.selectedSuperior = null
      this.userForm.get('superior').disable();
      this.userForm.get('superior').setValue(null);
    }

    this.setUserSuperiorValidator();
  }

  setUserSuperiorValidator() {
    if (this.hasSuperior) {
      this.userForm.get('superior').setValidators([Validators.required]);
    }
    else {
      this.userForm.get('superior').setValidators([]);
      this.userForm.get('superior').setValue(null);
      this.selectedSuperior = null;
    }
  }

  refactoryUser(data): User {
    let user: User = new User(
      data.id,
      data.name,
      data.login,
      data.password,
      data.roles,
      data.userGroup,
      data.status
    );
    user.hasSuperior = data.hasSuperior;
    if (user.hasSuperior) {
      user.superior = this.refactoryUser(data.superior);
    }
    return user;
  }

}
