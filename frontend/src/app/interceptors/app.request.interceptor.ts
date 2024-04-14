import {Router} from "@angular/router";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "../model/user.model";
import {Injectable} from "@angular/core";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  user: User = new User();
  constructor(
    private router: Router
  ) {}



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let httpHeaders = new HttpHeaders();
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || '{}');
    if (this.user && this.user.password && this.user.email){
      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(this.user.email + ':' + this.user.password));
    }else {
      let authorization = sessionStorage.getItem('Authorization');
      if (authorization){
        httpHeaders = httpHeaders.append('Authorization', authorization);
      }
    }
    let xsrf = sessionStorage.getItem('XSRF-TOKEN');
    if (xsrf){
      httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);
    }
    httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
    const xhr = req.clone({
      headers: httpHeaders
    });

    return next.handle(xhr).pipe(tap(() => {
    },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
           return;
          }
          this.router.navigate(['/dashboard']);
        }
      }
    ));
  }
}
