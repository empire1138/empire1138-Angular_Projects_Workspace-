import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialListComponent } from './components/tutorial-list/tutorial-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialListComponent,
    PageNotFoundComponent,
    NavbarComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
