import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initKeycloak } from './init-keycloak';
import { DemoApiService } from './services/demo-api.service';
import { HttpClientModule } from '@angular/common/http';
import { MessagePageComponent } from './components/message-page/message-page.component';
import { LoginButtonAndLinksComponent } from './components/login-button-and-links/login-button-and-links.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagePageComponent,
    LoginButtonAndLinksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    DemoApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
