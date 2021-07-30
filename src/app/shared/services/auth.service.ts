import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SignInForm } from 'src/app/index/login/signin/signin.component';
import { UserForm } from 'src/app/index/login/signup/signup.component';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }
  jwtHelper :JwtHelperService = new JwtHelperService()

  signInService(signInForm: SignInForm): Observable<SignInForm> {
    return this.httpClient.post<SignInForm>(`${environment.apiAddres}/auth/login`, signInForm, {
      withCredentials: true
    })
  }

  signUpService(userForm: UserForm): Observable<UserForm>{
    return this.httpClient.post<UserForm>(`${environment.apiAddres}/v1/user`, userForm, {
      withCredentials: true
    })
  }

  getToken() : string {
    return this.cookieService.get('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }


}
