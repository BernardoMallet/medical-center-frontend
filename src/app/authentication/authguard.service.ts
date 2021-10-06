import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(!this.isLogged()){
      this.router.navigate(['/login']);
      return false;
    }else{
      return true;
    }
  }

  isLogged(): boolean {
    var jsonOnSessionStorage = sessionStorage.getItem('USER_LOGGED');
    return jsonOnSessionStorage != null;
  }

  logout(){
    sessionStorage.removeItem('USER_LOGGED');
    this.router.navigate(['/login']);
  }
}
