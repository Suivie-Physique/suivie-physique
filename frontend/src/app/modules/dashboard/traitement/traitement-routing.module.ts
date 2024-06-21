import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraitementComponent } from './traitement.component';
import { ChequeComponent } from './pages/cheque/cheque.component';
import { EffetComponent } from './pages/effet/effet.component';

const routes: Routes = [
    {
      path: '',
      component: TraitementComponent,
      children:[
        { path: 'cheque', component: ChequeComponent},
        { path: 'effet', component: EffetComponent }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class TraitementRoutingModule { }