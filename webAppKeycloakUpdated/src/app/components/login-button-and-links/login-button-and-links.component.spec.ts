import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginButtonAndLinksComponent } from './login-button-and-links.component';

describe('LoginButtonAndLinksComponent', () => {
  let component: LoginButtonAndLinksComponent;
  let fixture: ComponentFixture<LoginButtonAndLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginButtonAndLinksComponent]
    });
    fixture = TestBed.createComponent(LoginButtonAndLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
