import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SignInForm } from 'src/app/index/login/signin/signin.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  signInService(signInForm: SignInForm): Observable<SignInForm> {
    return this.httpClient.post<SignInForm>(`${environment.apiAddres}/auth/login`, signInForm, {
      withCredentials: true
    })
  }

  signUpService(userForm: any): Observable<any>{
    console.log(userForm)
    return this.httpClient.post<any>(`${environment.apiAddres}/v1/user`, userForm, {
      withCredentials: true
    })
  }
}
