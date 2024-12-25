import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthenticationComponent } from '../../shared/authentication.component';
import { DemoApiService } from '../../services/demo-api.service';
import { EMPTY, Observable } from 'rxjs';
import { Response } from '../../models/response/response.interface';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-message-page',
  imports: [
    MatButton
  ],
  templateUrl: './message-page.component.html',
  styleUrl: './message-page.component.scss'
})
export class MessagePageComponent extends AuthenticationComponent implements OnInit {

  generalMessage: WritableSignal<string> = signal('');
  userSpecificMessage: WritableSignal<string> = signal('');

  private demoApiService = inject(DemoApiService);
  private router = inject(Router);

  override ngOnInit(): void {
    this.getKeycloakRoles();
    this.getGeneralText();
    this.getUserSpecificMessages()
  }

  backToHome() : void {
    this.router.navigate(['']);
  }

  private getGeneralText(): void {
    this.demoApiService.getGeneralText().subscribe({
      next: (result: Response) => {
        this.generalMessage.set(result.message != undefined ? result.message : '');
      },
      error: () => {
        this.generalMessage.set('Unable to show general message.');
      }
    });
  }

  private getUserSpecificMessages(): void {
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
      next: (result: Response) => {
        this.userSpecificMessage.set(result != undefined ? result.message : '');        
      },
      error: () => {
        this.userSpecificMessage.set('Unable to fetch user specific message');
      }
    });
  }

}