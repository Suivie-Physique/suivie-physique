// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from "@angular/core";
import { AppRoutingModule } from "./app/app-routing.module";
import { provideAnimations } from "@angular/platform-browser/animations";

bootstrapApplication(
  AppComponent,
  {
    providers: [
      importProvidersFrom(BrowserModule, AppRoutingModule),
      provideAnimations()
    ]
  }
)
.catch(err => console.error(err));