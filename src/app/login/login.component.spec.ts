import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';

const config = {
provide: 'SocialAuthServiceConfig',
useValue: {
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(`id`) 
    }
  ],
  onError: (err) => {
    console.error(err);
  }
} as SocialAuthServiceConfig
}
    
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: SocialAuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule,MatCardModule,GoogleSigninButtonModule],
      providers:[config]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(SocialAuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    // spyOn(authService, 'authState').and.returnValue(of({ items: [] }));
    expect(component).toBeTruthy();
  });
});
