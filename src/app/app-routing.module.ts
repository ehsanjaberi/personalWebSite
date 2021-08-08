import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './_helper/auth.guard';
const adminModule = () => import ('./admin/admin.module').then(x => x.AdminModule);
const clientModule = () => import ('./client/client.module').then(x => x.ClientModule);
const routes: Routes = [
  { path:'', loadChildren: clientModule},
  { path: 'adminpanel', loadChildren: adminModule }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
