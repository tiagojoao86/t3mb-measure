import { registerLocaleData } from '@angular/common';
import localePtExtra from '@angular/common/locales/extra/pt';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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
import { CylesConfigurationComponent } from './registration/cycles/cyles-configuration/cyles-configuration.component';
import { CycleConfigurationDropdownComponent } from './registration/cycles/cyles-configuration/cycle-configuration-dropdown/cycle-configuration-dropdown.component';
import { MyEvaluationsComponent } from './evaluations/my-evaluations/my-evaluations.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { EvaluationsService } from './evaluations/evaluations.service';
import { CompleteEvaluationComponent } from './evaluations/complete-evaluation/complete-evaluation.component';
import { MyEvaluatedComponent } from './evaluations/my-evaluated/my-evaluated.component';
import { PanelModule } from 'primeng/panel'
import { InputTextModule } from 'primeng/inputtext'
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {MegaMenuModule} from 'primeng/megamenu';


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
    EvaluationTypeEditComponent,
    CylesConfigurationComponent,
    CycleConfigurationDropdownComponent,
    MyEvaluationsComponent,
    EvaluationsComponent,
    CompleteEvaluationComponent,
    MyEvaluatedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule, InputTextModule, PasswordModule, ButtonModule, MegaMenuModule
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
    EvaluationTypeService,
    EvaluationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
