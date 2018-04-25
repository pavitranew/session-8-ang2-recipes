import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { VesselsComponent } from './components/vessels/vessels.component';
import { BindingComponent } from './components/binding/binding.component';
import { EventsComponent } from './components/events/events.component';
import { FormsComponent } from './components/forms/forms.component';


@NgModule({
  declarations: [
    AppComponent,
    VesselsComponent,
    BindingComponent,
    EventsComponent,
    FormsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
