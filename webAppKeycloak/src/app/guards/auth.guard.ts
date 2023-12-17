import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

    constructor(
        private router: Router,
        private readonly keycloak: KeycloakService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.keycloak.isLoggedIn().then((authenticated) => {
            if (authenticated) {
                const roles = this.keycloak.getUserRoles();

                if(route.data['roles'] && !roles.some(item => route.data['roles'].includes(item)) ) {               
                    // role not authorized so redirect to home page
                    this.router.navigate(['/']);
                    return false;
                }

                // authorized so return true
                return true;
            } else {
                // not logged in so redirect to login pag
                this.router.navigate(['/']);
                return false;
            }
        });        
    }

}