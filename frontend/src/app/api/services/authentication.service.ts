/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { activateAccount } from '../fn/authentication/activate-account';
import { ActivateAccount$Params } from '../fn/authentication/activate-account';
import { authenticate } from '../fn/authentication/authenticate';
import { Authenticate$Params } from '../fn/authentication/authenticate';
import { AuthenticationResponse } from '../models/authentication-response';
import { forgotPassword } from '../fn/authentication/forgot-password';
import { ForgotPassword$Params } from '../fn/authentication/forgot-password';
import { logout } from '../fn/authentication/logout';
import { Logout$Params } from '../fn/authentication/logout';
import { logout1 } from '../fn/authentication/logout-1';
import { Logout1$Params } from '../fn/authentication/logout-1';
import { logout2 } from '../fn/authentication/logout-2';
import { Logout2$Params } from '../fn/authentication/logout-2';
import { logout3 } from '../fn/authentication/logout-3';
import { Logout3$Params } from '../fn/authentication/logout-3';
import { logout4 } from '../fn/authentication/logout-4';
import { Logout4$Params } from '../fn/authentication/logout-4';
import { logout5 } from '../fn/authentication/logout-5';
import { Logout5$Params } from '../fn/authentication/logout-5';
import { logout6 } from '../fn/authentication/logout-6';
import { Logout6$Params } from '../fn/authentication/logout-6';
import { refreshToken } from '../fn/authentication/refresh-token';
import { RefreshToken$Params } from '../fn/authentication/refresh-token';
import { register } from '../fn/authentication/register';
import { Register$Params } from '../fn/authentication/register';
import { resendActivationEmail } from '../fn/authentication/resend-activation-email';
import { ResendActivationEmail$Params } from '../fn/authentication/resend-activation-email';
import { resetPassword } from '../fn/authentication/reset-password';
import { ResetPassword$Params } from '../fn/authentication/reset-password';


/**
 * Handles all authentication requests
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `resetPassword()` */
  static readonly ResetPasswordPath = '/auth/resetPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPassword$Response(params: ResetPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return resetPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPassword(params: ResetPassword$Params, context?: HttpContext): Observable<{
}> {
    return this.resetPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/auth/register';

  /**
   * Register a new user.
   *
   * Registers a new user and sends an activation email
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * Register a new user.
   *
   * Registers a new user and sends an activation email
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<{
}> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `refreshToken()` */
  static readonly RefreshTokenPath = '/auth/refresh-token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshToken$Response(params: RefreshToken$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return refreshToken(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refreshToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshToken(params: RefreshToken$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.refreshToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/auth/authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: Authenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: Authenticate$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authenticate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `resendActivationEmail()` */
  static readonly ResendActivationEmailPath = '/auth/resend-activation-email';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resendActivationEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  resendActivationEmail$Response(params: ResendActivationEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return resendActivationEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resendActivationEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resendActivationEmail(params: ResendActivationEmail$Params, context?: HttpContext): Observable<{
}> {
    return this.resendActivationEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `forgotPassword()` */
  static readonly ForgotPasswordPath = '/auth/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword$Response(params: ForgotPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return forgotPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword(params: ForgotPassword$Params, context?: HttpContext): Observable<{
}> {
    return this.forgotPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `activateAccount()` */
  static readonly ActivateAccountPath = '/auth/activate-account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `activateAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateAccount$Response(params: ActivateAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return activateAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `activateAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateAccount(params: ActivateAccount$Params, context?: HttpContext): Observable<{
}> {
    return this.activateAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `logout()` */
  static readonly LogoutPath = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout$Response(params?: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return logout(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout(params?: Logout$Params, context?: HttpContext): Observable<string> {
    return this.logout$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `logout3()` */
  static readonly Logout3Path = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout3()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout3$Response(params?: Logout3$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return logout3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout3(params?: Logout3$Params, context?: HttpContext): Observable<string> {
    return this.logout3$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `logout2()` */
  static readonly Logout2Path = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout2()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout2$Response(params?: Logout2$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return logout2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout2(params?: Logout2$Params, context?: HttpContext): Observable<string> {
    return this.logout2$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `logout5()` */
  static readonly Logout5Path = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout5()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout5$Response(params?: Logout5$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return logout5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout5(params?: Logout5$Params, context?: HttpContext): Observable<string> {
    return this.logout5$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `logout6()` */
  static readonly Logout6Path = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout6()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout6$Response(params?: Logout6$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return logout6(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout6(params?: Logout6$Params, context?: HttpContext): Observable<string> {
    return this.logout6$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `logout1()` */
  static readonly Logout1Path = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout1()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout1$Response(params?: Logout1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return logout1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout1(params?: Logout1$Params, context?: HttpContext): Observable<string> {
    return this.logout1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `logout4()` */
  static readonly Logout4Path = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout4()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout4$Response(params?: Logout4$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return logout4(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout4(params?: Logout4$Params, context?: HttpContext): Observable<string> {
    return this.logout4$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
