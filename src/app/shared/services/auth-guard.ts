import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): boolean | Promise<boolean> {
    if (!this.auth.isAuthenticated()) {
        return this.auth.getAccessToken()
                .then( _ => true)
                .catch( _ => {
                    this.router.navigate(['sign'])
                    return false
                })
    } else {
        return true
    }
  }
}
