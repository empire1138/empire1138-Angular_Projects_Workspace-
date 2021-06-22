import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ViewEmailsPageComponent } from './view-emails-page/view-emails-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'view-emails', component : ViewEmailsPageComponent},
  {path: 'register', component:RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
