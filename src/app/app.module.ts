import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPageComponent } from './form-page/form-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { FormInputComponent } from './form-page/components/form-input/form-input.component';

@NgModule({
  declarations: [
    AppComponent,
    FormPageComponent,
    ResultPageComponent,
    FormInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
