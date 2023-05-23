import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeMassageComponent } from './components/welcome-massage/welcome-massage.component';
import { LfsrComponent } from './components/lfsr/lfsr.component';
import { MsrComponent } from './components/msr/msr.component';
import { AlgorithmPickerComponent } from './components/algorithm-picker/algorithm-picker.component';
import {FormsModule} from "@angular/forms";



const routes: Routes = [
  {path: 'lfsr', component: LfsrComponent},
  {path: 'msr', component: MsrComponent},
  {path: 'welcome', component: WelcomeMassageComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: '**', redirectTo: '/welcome', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    WelcomeMassageComponent,
    LfsrComponent,
    MsrComponent,
    AlgorithmPickerComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
