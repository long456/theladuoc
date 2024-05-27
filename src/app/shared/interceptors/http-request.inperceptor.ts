import {Injectable} from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {LoginService} from "../../layouts/auth-layout/auth/services/login.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiURL = environment.apiUrl;

    const modifiedRequest = req.clone({
      url: apiURL + req.url,
      setHeaders: {
        Authorization:  `Bearer ${localStorage.getItem('tokenKey')}`,
        // 'Content-Type': 'application/json',
      }
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.loginService.logOut()
          this.router.navigate(['auth']);
          return throwError(() => new Error('Unauthorized'));
        }
        console.log(error)
        return throwError(() => error.error);
      })
    );
  }
}
