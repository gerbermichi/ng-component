import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MgTableComponent, MgColumnDirective, MgColumnTemplateDirective} from "./table/mg-table.component";

@NgModule({
  declarations: [
    AppComponent,
    MgTableComponent,
    MgColumnDirective,
    MgColumnTemplateDirective

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
