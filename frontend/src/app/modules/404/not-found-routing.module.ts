import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from '../404/pages/404-notfound.component';

const routes: Routes = [
    {
        path: '',
        component: NotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class NotFoundRouting { }