import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './Auth/login/login.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { EducationalComponent } from './educational/educational.component';
import { SkillComponent } from './skill/skill.component';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    UserComponent,
    AboutComponent,
    EducationalComponent,
    SkillComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
