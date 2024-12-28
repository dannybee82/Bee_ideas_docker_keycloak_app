import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from "keycloak-angular";
import Keycloak, { KeycloakRoles } from "keycloak-js";
import { ApplicationRoles } from "../models/application-roles/application-roles.enum";

@Component({
    template: ''
})
export abstract class AuthenticationComponent implements OnInit {

    authenticated: WritableSignal<boolean> = signal(false);    
    isAdmin: WritableSignal<boolean> = signal(false);
    isUser: WritableSignal<boolean> = signal(false);
    isRegistered: WritableSignal<boolean> = signal(false);

    private readonly keycloak = inject(Keycloak);
    private keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    ngOnInit(): void {
        this.getKeycloakRoles();
    }

    protected getKeycloakRoles(): void {
        if(this.keycloakSignal().type === KeycloakEventType.Ready) {            
            this.authenticated.set(this.keycloakSignal().args === true ? true : false);

            if(this.authenticated()) {
                const keycloakRoles: KeycloakRoles | undefined  = this.keycloak.realmAccess;
                const roles: string[] = keycloakRoles?.roles ?? [];

                this.isAdmin.set(roles.includes(ApplicationRoles.ADMIN));
                this.isUser.set(roles.includes(ApplicationRoles.USER));
                this.isRegistered.set(roles.includes(ApplicationRoles.REGISTERED));
            }            
        }

        if (this.keycloakSignal().type === KeycloakEventType.AuthLogout) {
            this.authenticated.set(false);
        }
    }

    login() : void {
        this.keycloak.login();
    }
    
    logout() : void {
        this.keycloak.logout();
    }

}