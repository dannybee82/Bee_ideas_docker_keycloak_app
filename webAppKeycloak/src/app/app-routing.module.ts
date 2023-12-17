import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagePageComponent } from './components/message-page/message-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginButtonAndLinksComponent } from './components/login-button-and-links/login-button-and-links.component';

const routes: Routes = [
  { path: '', component: LoginButtonAndLinksComponent },
  { path: 'admins-only', component:  MessagePageComponent, canActivate: [AuthGuard], data: {roles: ["ADMIN"]} },
  { path: 'users-only', component:  MessagePageComponent, canActivate: [AuthGuard], data: {roles: ["USER"]} },
  { path: 'registered-only', component:  MessagePageComponent, canActivate: [AuthGuard], data: {roles: ["REGISTERED"]} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
