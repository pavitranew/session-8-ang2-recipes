import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service'
import { RouterModule, Routes } from '@angular/router'


import { AppComponent } from './app.component';
// import { VesselsComponent } from './components/vessels/vessels.component';
// import { BindingComponent } from './components/binding/binding.component';
// import { EventsComponent } from './components/events/events.component';
// import { FormsComponent } from './components/forms/forms.component';
// import { DataComponent } from './components/data/data.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'user/:id', component:UserDetailsComponent}
];

@NgModule({
  declarations: [
  AppComponent,
  // VesselsComponent,
  // BindingComponent,
  // EventsComponent,
  // FormsComponent,
  // DataComponent,
  NavbarComponent,
  HomeComponent,
  AboutComponent,
  UserDetailsComponent
  ],
  imports: [
  BrowserModule,
  RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
