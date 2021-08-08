import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientService } from '../services/client.service';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {path: '', component: LayoutComponent, resolve:{clientInf:ClientService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
