import { Component } from '@angular/core';
import { AuthenticationComponent } from '../../shared/authentication.component';
import { MatButton }  from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [    
    RouterModule,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends AuthenticationComponent {  

}