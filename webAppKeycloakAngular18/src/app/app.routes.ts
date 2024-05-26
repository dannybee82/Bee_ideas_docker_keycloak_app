import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MessagePageComponent } from './components/message-page/message-page.component';
import { LoginButtonAndLinksComponent } from './components/login-button-and-links/login-button-and-links.component';
import { ApplicationRoles } from './models/application-roles.enum';

export const routes: Routes = [
    { 
        path: '', 
        component: LoginButtonAndLinksComponent 
    },
    { 
        path: 'admins-only', 
        component:  MessagePageComponent, 
        canActivate: [AuthGuard], 
        data: {roles: [ApplicationRoles.ADMIN]} 
    },
    { 
        path: 'users-only', 
        component:  MessagePageComponent, 
        canActivate: [AuthGuard], 
        data: {roles: [ApplicationRoles.USER]} 
    },
    { 
        path: 'registered-only', 
        component:  MessagePageComponent, 
        canActivate: [AuthGuard], 
        data: {roles: [ApplicationRoles.REGISTERED]} 
    }
 ];