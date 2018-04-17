import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("token");
    // console.log(idToken)
    if (idToken) {
      const cloned = req.clone({
        setHeaders: {
          "x-access-token":  idToken
        }
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
