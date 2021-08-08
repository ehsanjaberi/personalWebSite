import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helper/auth.guard';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './Auth/login/login.component';
import { ContactComponent } from './contact/contact.component';
import { EducationalComponent } from './educational/educational.component';
import { LayoutComponent } from './layout.component';
import { SkillComponent } from './skill/skill.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
    {path: '', component: UserComponent,canActivate:[AuthGuard]},
    { path: 'educational', component: EducationalComponent, canActivate:[AuthGuard]},
    {path: 'users', component: UserComponent,canActivate:[AuthGuard]},
    {path: 'about', component: AboutComponent,canActivate:[AuthGuard]},
    {path: 'skills', component: SkillComponent,canActivate:[AuthGuard]},
    {path: 'contact', component: ContactComponent,canActivate:[AuthGuard]},
  ]},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
