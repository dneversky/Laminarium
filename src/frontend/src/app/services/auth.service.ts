import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private isAuth: boolean;

    login(){
        this.isAuth = true;
    }

    logout(){
        this.isAuth = false;
    }
}