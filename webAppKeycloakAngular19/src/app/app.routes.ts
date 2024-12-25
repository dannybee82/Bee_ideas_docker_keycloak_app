import { Routes } from '@angular/router';
import { canActivateAuthRole } from './guards/activate-auth-role.guard';
import { LoginComponent } from './components/login/login.component';
import { MessagePageComponent } from './components/message-page/message-page.component';
import { ApplicationRoles } from './models/application-roles/application-roles.enum';

export const routes: Routes = [
    { 
        path: '', 
        component: LoginComponent 
    },
    { 
        path: 'admins-only', 
        component:  MessagePageComponent, 
        canActivate: [canActivateAuthRole], 
        data: {roles: [ApplicationRoles.ADMIN]} 
    },
    { 
        path: 'users-only', 
        component:  MessagePageComponent, 
        canActivate: [canActivateAuthRole], 
        data: {roles: [ApplicationRoles.USER]} 
    },
    { 
        path: 'registered-only', 
        component:  MessagePageComponent, 
        canActivate: [canActivateAuthRole], 
        data: {roles: [ApplicationRoles.REGISTERED]} 
    }
];