import { Component, WritableSignal, signal } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-button-and-links',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './login-button-and-links.component.html',
  styleUrl: './login-button-and-links.component.scss'
})
export class LoginButtonAndLinksComponent {

  authenticated: WritableSignal<boolean> = signal(false);
  isUser: WritableSignal<boolean> = signal(false);
  isAdmin: WritableSignal<boolean> = signal(false);
  isRegistered: WritableSignal<boolean> = signal(false);

  constructor(
    private readonly keycloak: KeycloakService
  ) {
    this.authenticated.set(this.keycloak.isLoggedIn());

    if(this.authenticated()) {
      const roles = this.keycloak.getUserRoles();
      this.isUser.set(roles.includes('USER'));
      this.isAdmin.set(roles.includes('ADMIN'));
      this.isRegistered.set(roles.includes('REGISTERED'));
    }
  }

  login() : void {
    this.keycloak.login();
  }

  logout() : void {
    this.keycloak.logout();
  }

}
