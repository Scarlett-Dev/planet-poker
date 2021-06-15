import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import {MatExpansionPanel} from "@angular/material/expansion";
import {MatNavList} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ObserverComponent } from './observer/observer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    CardComponent,
    ObserverComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
