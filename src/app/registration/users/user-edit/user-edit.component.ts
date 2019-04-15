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
  hasSuperior: boolean;
  superiorsList: Array<User> = new Array<User>();
  userGroupsList: Array<UserGroup> = new Array<UserGroup>();
  nextId: number = 0;
  

  constructor(private usersService: UsersService, 
    private rolesService: RolesService, 
    private messageService: MessageService,
    private route: ActivatedRoute,     
    private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.usersService.getSuperiors()
              .subscribe(response => {
                response.data.forEach(element => {
                  this.superiorsList.push(this.refactoryUser(element));
                });
                this.usersService.getUserGroups()
                .subscribe(response => {
                  response.data.forEach(element => {
                    this.userGroupsList.push(this.refactoryUserGroup(element))
                  });
                });
              },error => {
                this.messageService.showMessage(new MessageSended(['Erro ao lista de Superiores'],'Erro'));
                console.log(error);
              });
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] !== 'new') {
              this.editMode = true;              
                this.user = this.refactoryUser(this.usersService.getEditUser());
                this.initForm(); 
          }
          else {
            this.usersService.getNextId()
            .subscribe(response => {
              this.nextId = response.data;
              this.editMode = false;
              this.initForm();
            },error => {
              this.messageService.showMessage(new MessageSended(['Erro ao carregar ID'],'Erro'));
              console.log(error);
            });
            
          }          
        }
    );
  }

  onSubmit (){
    let newRoles: Array<Role> = new Array<Role>();
    if (this.userForm.value['isAdmin'] == true){
      newRoles.push(this.rolesService.getRoleById(1));
    }
    if (this.userForm.value['isAvaliador'] == true){
      newRoles.push(this.rolesService.getRoleById(2));
    }
    if (this.userForm.value['isAvaliado'] == true){
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
      this.userForm.value['userGroup'],
      this.userForm.value['isActive'] ? 'A' : 'I'      
    );
    user.superior = this.userForm.value['superior'];
    user.hasSuperior = this.hasSuperior;
    if (this.editMode) {   
      //console.log(this.usersService.updateUser(user));
      this.usersService.updateUser(user).
      subscribe(
        response => {
          if (response.errors.length == 0) {
            this.messageService.showMessage(new MessageSended(['Usuario alterado com sucesso'], 'Informação'));
            this.router.navigate(['/registration/users']);
          }
          else {
            this.messageService.showMessage(new MessageSended(['Não foi possível atualizar o usuário '+user.id], 'Erro'));
          }
        },
        error => {
          this.messageService.showMessage(new MessageSended(['Não foi possível atualizar o usuário '+user.id], 'Erro'));
          console.log(error);
        }
      );
      
    }
    else {
      this.usersService.addUser(user).
      subscribe(
        response => {
          if (response.errors.length == 0) {
            this.messageService.showMessage(new MessageSended(['Usuario cadastrado com sucesso'], 'Informação'));
            this.router.navigate(['/registration/users']);
          }
          else {
            this.messageService.showMessage(new MessageSended(['Não foi possível cadastrar o usuário '+user.id], 'Erro'));
          }
        },
        error => {
          this.messageService.showMessage(new MessageSended(['Não foi possível cadastrar o usuário '+user.id], 'Erro'));
          console.log(error);
        }
      );      
    }
  }

  onCancel() {
    this.user = null;
    this.usersService.setEditUser(null);
    this.router.navigate(['/registration/users']);
  }

  initForm() {
    if (this.editMode) {  
      this.userForm.patchValue({ 
        id: this.user.id,
        login: this.user.login,
        name: this.user.name,
        password: this.user.password,
        isAdmin: this.user.isRolePresent(1),
        isAvaliador: this.user.isRolePresent(2),
        isAvaliado: this.user.isRolePresent(3),
        isActive: this.user.isActive(),
        userGroup: this.user.userGroup,
        superior: this.user.superior,
        hasSuperior: this.user.hasSuperior
      });      
    }
    else {
      this.userForm.patchValue({
        id: this.nextId,
        isAvaliado: true,
        isActive: true,
        userGroup: this.userGroupsList,
        superior: null
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
      'isAdmin': new FormControl(false),
      'isAvaliador': new FormControl(false),
      'isAvaliado': new FormControl({value: true}),
      'isActive': new FormControl({value: true}),
      'userGroup': new FormControl(null, Validators.required),
      'superior': new FormControl(null),
      'hasSuperior': new FormControl(true)
    });
  }

  /*onChangeGroup(id: number) {
    this.userGroupsList.forEach(group => {
      if (id === group.id) {
        console.log("Mudou");
        console.log(group);
        this.selectedGroup = group;
      }
    });
  }

  onChangeSuperior(id: number) {
    this.superiorsList.forEach(superior => {
      if (superior.id === id) {
        console.log("Mudou");
        console.log(superior);
        this.selectedSuperior = superior;
      }
    });
  }*/

  onChangeHasSuperior() {
    if (this.userForm.get('hasSuperior').value == true) {
      this.hasSuperior = true;
      this.userForm.get('superior').enable();
    }
    else {      
      this.hasSuperior = false;
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
    }
  }

  refactoryUser(data): User {
    let user: User = new User(
      data.id,
      data.name,
      data.login,
      data.password,
      data.roles,
      data.userGroup != null ? this.refactoryUserGroup(data.userGroup): null,
      data.status
    );
    user.hasSuperior = data.hasSuperior;
    if (user.hasSuperior) {
      user.superior = this.refactoryUser(data.superior);
    }
    return user;
  }

  refactoryUserGroup(data): UserGroup {
    let userGroup: UserGroup = new UserGroup(
      data.id,
      data.name
    );
    return userGroup;
  }

}
