import {Injectable} from "@angular/core";

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {env} from "../../../enviroments/env";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiURL = env.apiUrl;

    const modifiedRequest = req.clone({
      url: apiURL + req.url,
      setHeaders: {
        Authorization:  `Bearer ${localStorage.getItem('tokenKey')}`,
        'Content-Type': 'application/json',
      }
    });

    return next.handle(modifiedRequest);
  }
}
