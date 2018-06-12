import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing-module';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
      ],
      imports: [
        SharedModule,
        AppRoutingModule
      ],
      exports: [
        HeaderComponent
      ]
})
export class CoreModule { }
