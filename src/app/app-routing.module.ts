import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './shared/services/auth-guard';

const routes: Routes = [
  {
    path:'',
    component:AppComponent,
    children: [
      {
        path:'',
        canActivate:[AuthGuard],
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule)
      }
    ]
  },
  { path: '**', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
