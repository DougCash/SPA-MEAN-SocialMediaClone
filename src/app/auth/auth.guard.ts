import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): boolean | Observable<boolean> | Promise<boolean> {
            const isAuth = this.authService.getIsAuth();
            //If not logged in, send em to the login
            if(!isAuth){
                this.router.navigate(['/auth/login']);
            }
            return isAuth;
    }
}