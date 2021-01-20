import { tokenize } from "@angular/compiler/src/ml_parser/lexer";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor (private tokeService: TokenStorageService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree{
        const user = this.tokeService.getUser();
        if(user === null){
            this.router.createUrlTree(['/login']);
            return false;
        }
        return true;
    }

}