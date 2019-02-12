import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { CyclesEditComponent } from './registration/cycles/cycles-edit/cycles-edit.component';
import { CyclesComponent } from './registration/cycles/cycles.component';
import { EvaluationTypeEditComponent } from './registration/evaluations/evaluation-type/evaluation-type-edit/evaluation-type-edit.component';
import { EvaluationTypeComponent } from './registration/evaluations/evaluation-type/evaluation-type.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserEditComponent } from './registration/users/user-edit/user-edit.component';
import { UsersComponent } from './registration/users/users.component';

const routes: Routes = [
  { path: '', component: MainComponent, data: {breadcrumb: 'Home'}, canActivate: [AuthGuard],
      children: [
        { path: 'registration', component: RegistrationComponent,  data: {breadcrumb: 'Cadastros'},  
                              canActivate: [AuthGuard], children: [
          { path: 'users', component: UsersComponent, data: {breadcrumb: 'Usuários'}},  
          { path: 'users/:id', component: UserEditComponent, data: {breadcrumb: 'Usuários'}},
          { path: 'cycles', component: CyclesComponent, data: {breadcrumb: 'Ciclos'}},  
          { path: 'cycles/:id', component: CyclesEditComponent, data: {breadcrumb: 'Ciclos'}},
          { path: 'evaluations-type', component: EvaluationTypeComponent, data: {breadcrumb: 'Tipos de Avaliações'}},  
          { path: 'evaluations-type/:id', component: EvaluationTypeEditComponent, data: {breadcrumb: 'Tipos de Avaliações'}}
        ]},
      ]},
  { path: 'login', component: LoginComponent},  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
