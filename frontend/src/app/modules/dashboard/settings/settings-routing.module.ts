import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { MembresComponent } from './pages/membres/membres.component';
import { CompteComponent } from './pages/compte/compte.component';
import { JoursFeriesComponent } from './pages/jours-feries/jours-feries.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { IntegrationComponent } from './pages/integration/integration.component';
import { FluxComponent } from './pages/flux/flux.component';
import { OrganisationComponent } from './pages/organisation/organisation.component';
import { PointCaptureComponent } from './pages/point-capture/point-capture.component';


const routes: Routes = [
    {
      path: '',
      component: SettingsComponent,
      children:[
        { path: 'membres', component: MembresComponent},
        { path: 'compte', component: CompteComponent },
        { path: 'jours-feries' , component: JoursFeriesComponent },
        { path: 'archive', component: ArchiveComponent },
        { path: 'point-capture', component: PointCaptureComponent},
        { path: 'integration', component: IntegrationComponent },
        { path: 'flux', component: FluxComponent},
        { path: 'organisation', component: OrganisationComponent },
        { path: '**', redirectTo: 'error/404' },
      ]
    
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class SettingsRoutingModule { }