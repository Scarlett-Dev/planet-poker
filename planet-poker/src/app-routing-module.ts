import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './app/login/login.component';
import {BoardComponent} from "./app/board/board.component";






const routes: Routes = [
  {path: '', redirectTo:"login", pathMatch:"full"},
  {path: 'login', component:LoginComponent},
  {path: 'board', component:BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule{

}
