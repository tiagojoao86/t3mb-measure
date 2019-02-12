import { registerLocaleData } from '@angular/common';
import localePtExtra from '@angular/common/locales/extra/pt';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { MessageComponent } from './message-service/message.component';
import { MessageService } from './message-service/message.service';
import { CyclesEditComponent } from './registration/cycles/cycles-edit/cycles-edit.component';
import { CyclesComponent } from './registration/cycles/cycles.component';
import { CyclesService } from './registration/cycles/cycles.service';
import { EvaluationTypeService } from './registration/evaluations/evaluation-type/evaluation-type.service';
import { RegistrationComponent } from './registration/registration.component';
import { UserEditComponent } from './registration/users/user-edit/user-edit.component';
import { UsersComponent } from './registration/users/users.component';
import { UsersService } from './registration/users/users.service';
import { RolesService } from './roles/roles.service';
import { EvaluationTypeComponent } from './registration/evaluations/evaluation-type/evaluation-type.component';
import { EvaluationTypeEditComponent } from './registration/evaluations/evaluation-type/evaluation-type-edit/evaluation-type-edit.component';


registerLocaleData(localePt, 'pt-BR', localePtExtra);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    UsersComponent,
    RegistrationComponent,
    UserEditComponent,
    MessageComponent,
    CyclesComponent,
    CyclesEditComponent,
    EvaluationTypeComponent,
    EvaluationTypeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, 
    AuthGuard, 
    UsersService, 
    RolesService, 
    MessageService,
    CyclesService,
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    },
    EvaluationTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
