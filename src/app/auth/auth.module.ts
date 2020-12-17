import { NgModule } from "@angular/core"
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { AuthRoutingModule } from './auth-routing.module'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule{

}