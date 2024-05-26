import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { DemoApiService } from '../../services/demo-api.service';
import { KeycloakService } from 'keycloak-angular';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Response } from '../../models/response.interface';

@Component({
  selector: 'app-message-page',
  standalone: true,
  imports: [],
  templateUrl: './message-page.component.html',
  styleUrl: './message-page.component.scss'
})
export class MessagePageComponent implements OnInit {

  authenticated: WritableSignal<boolean> = signal(false);
  isUser: WritableSignal<boolean> = signal(false);
  isAdmin: WritableSignal<boolean> = signal(false);
  isRegistered: WritableSignal<boolean> = signal(false);

  generalMessage: string = "";
  userSpecificMessage: string = "";

  constructor(
    private readonly keycloak: KeycloakService, 
    private demoApiService: DemoApiService,
    private router: Router
  ) {
    this.authenticated.set(this.keycloak.isLoggedIn());

    if(this.authenticated()) {
      const roles = this.keycloak.getUserRoles();
      this.isUser.set(roles.includes('USER'));
      this.isAdmin.set(roles.includes('ADMIN'));
      this.isRegistered.set(roles.includes('REGISTERED'));
    }
  }

  ngOnInit() : void {
    this.getGeneralText();
    this.getUserSpecificMessages();
  }

  backToHome() : void {
    this.router.navigate(['']);
  }

  private getGeneralText() : void {
    this.demoApiService.getGeneralText().subscribe({
      next: (result) => {
        this.generalMessage = (result.message != undefined) ? result.message : '';
      },
      error: () => {
        this.generalMessage = 'Unable to show general message.';
      }
    });
  }

  private getUserSpecificMessages() : void {
    let action$: Observable<Response>;

    if (this.isAdmin()) {
      action$ = this.demoApiService.getAdminMessage();
    } else if (this.isUser()) {
      action$ = this.demoApiService.getUserMessage();
    } else if (this.isRegistered()) {
      action$ = this.demoApiService.getRegisteredMessage();
    } else {
      action$ = EMPTY;
    }
    
    action$.subscribe({
      next: (result) => {
        if(result.message != undefined) {
          this.userSpecificMessage = result.message;
        }        
      },
      error: () => {
        this.userSpecificMessage = "Unable to fetch user specific message";
      }
    });
  }

}


