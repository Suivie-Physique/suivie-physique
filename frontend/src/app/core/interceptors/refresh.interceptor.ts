import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, Observable, switchMap } from 'rxjs';
import { JwtTokenService } from '../services/jwt-token.service';
import { RefreshTokenService } from '../services/refresh-token.service';
import { refreshToken } from 'app/api/fn/authentication/refresh-token';
import { from } from 'rxjs';
import { environment } from 'app/core/environments/environment';


@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  constructor(private refreshTokenService: RefreshTokenService, private jwtTokenService: JwtTokenService, private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 || error.status === 403) {
                const params = {
                    body: {
                        access_token: this.jwtTokenService.token,
                        refresh_token: this.refreshTokenService.token
                    }
                }
               
                return this.http.post(`${environment.apiBaseUrl}/auth/refresh-token`, params).pipe(
                    switchMap((response: any) => {
                        this.jwtTokenService.token = response.access_token!;
                        this.refreshTokenService.token = response.refresh_token!;
                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${response.access_token}`
                            }
                        });
                        return next.handle(request);
                    }),
                    catchError((error: HttpErrorResponse) => {
                        this.refreshTokenService.removeToken();
                        return from(Promise.reject(error));
                    })
                );
            }else {
                return from(Promise.reject(error));
            }
        }
           
        
    ));
  }

}



export const refreshInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshInterceptor,
  multi: true
}
