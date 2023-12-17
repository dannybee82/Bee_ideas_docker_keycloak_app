import { Component, OnInit } from '@angular/core';
import { DemoApiService } from 'src/app/services/demo-api.service';
import { KeycloakService } from 'keycloak-angular';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/models/response-model';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss']
})
export class MessagePageComponent implements OnInit {

  public authenticated: boolean = false;
  public isUser: boolean = false;
  public isAdmin: boolean = false;
  public isRegistered: boolean = false;

  public generalMessage: string = "";
  public userSpecificMessage: string = "";

  constructor(
    private keycloak: KeycloakService, 
    private demoApiService: DemoApiService,
    private router: Router) 
  {
    if(this.keycloak.isLoggedIn()) {
      this.authenticated = this.keycloak.isLoggedIn();

      const roles = this.keycloak.getUserRoles();
      this.isUser = roles.includes('USER');
      this.isAdmin = roles.includes('ADMIN');
      this.isRegistered = roles.includes('REGISTERED');
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
    let action$: Observable<ResponseModel>;

    if (this.isAdmin) {
      action$ = this.demoApiService.getAdminMessage();
    } else if (this.isUser) {
      action$ = this.demoApiService.getUserMessage();
    } else if (this.isRegistered) {
      action$ = this.demoApiService.getRegisteredMessage();
    } else {
      action$ = of();
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
