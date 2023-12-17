import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-login-button-and-links',
  templateUrl: './login-button-and-links.component.html',
  styleUrls: ['./login-button-and-links.component.scss']
})
export class LoginButtonAndLinksComponent {

  public authenticated: boolean = false;
  public isUser: boolean = false;
  public isAdmin: boolean = false;
  public isRegistered: boolean = false;

  constructor(private keycloak: KeycloakService) {
    if(this.keycloak.isLoggedIn()) {
      this.authenticated = this.keycloak.isLoggedIn();

      const roles = this.keycloak.getUserRoles();
      this.isUser = roles.includes('USER');
      this.isAdmin = roles.includes('ADMIN');
      this.isRegistered = roles.includes('REGISTERED');
    }
  }

  login() : void {
    this.keycloak.login();
  }

  logout() : void {
    this.keycloak.logout();
  }

}
