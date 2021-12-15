import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table'; 
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog'

import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { LoginComponent } from './login/login.component';
import {MatExpansionPanel} from "@angular/material/expansion";
import {MatNavList} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ObserverComponent } from './observer/observer.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app-routing-module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    CardComponent,
    ObserverComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
