import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { USER_KEY } from "../auth/auth.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //sending for all request withCredentials true for using cookies
        req = req.clone({
            withCredentials: true,
        });

        //getting token data from session, setting with headers of requests
        const token_data = window.sessionStorage.getItem(USER_KEY);
        if(!token_data){
            return next.handle(req);
        }
        const token = JSON.parse(token_data).data.token;
        const authRequest = req.clone({
            headers:req.headers.set('Authorization', `Bearer ${token}`)
        })

        return next.handle(authRequest);
    }
}

export const httpInterceptorProviders =[
    {
        provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true
    }
]