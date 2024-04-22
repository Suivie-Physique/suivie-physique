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
import { forgotPassword1 } from '../fn/authentication/forgot-password-1';
import { ForgotPassword1$Params } from '../fn/authentication/forgot-password-1';
import { forgotPassword2 } from '../fn/authentication/forgot-password-2';
import { ForgotPassword2$Params } from '../fn/authentication/forgot-password-2';
import { forgotPassword3 } from '../fn/authentication/forgot-password-3';
import { ForgotPassword3$Params } from '../fn/authentication/forgot-password-3';
import { forgotPassword4 } from '../fn/authentication/forgot-password-4';
import { ForgotPassword4$Params } from '../fn/authentication/forgot-password-4';
import { forgotPassword5 } from '../fn/authentication/forgot-password-5';
import { ForgotPassword5$Params } from '../fn/authentication/forgot-password-5';
import { forgotPassword6 } from '../fn/authentication/forgot-password-6';
import { ForgotPassword6$Params } from '../fn/authentication/forgot-password-6';
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
import { register } from '../fn/authentication/register';
import { Register$Params } from '../fn/authentication/register';
import { resendActivationEmail } from '../fn/authentication/resend-activation-email';
import { ResendActivationEmail$Params } from '../fn/authentication/resend-activation-email';
import { resetPassword } from '../fn/authentication/reset-password';
import { ResetPassword$Params } from '../fn/authentication/reset-password';
import { resetPassword1 } from '../fn/authentication/reset-password-1';
import { ResetPassword1$Params } from '../fn/authentication/reset-password-1';
import { resetPassword2 } from '../fn/authentication/reset-password-2';
import { ResetPassword2$Params } from '../fn/authentication/reset-password-2';
import { resetPassword3 } from '../fn/authentication/reset-password-3';
import { ResetPassword3$Params } from '../fn/authentication/reset-password-3';
import { resetPassword4 } from '../fn/authentication/reset-password-4';
import { ResetPassword4$Params } from '../fn/authentication/reset-password-4';
import { resetPassword5 } from '../fn/authentication/reset-password-5';
import { ResetPassword5$Params } from '../fn/authentication/reset-password-5';
import { resetPassword6 } from '../fn/authentication/reset-password-6';
import { ResetPassword6$Params } from '../fn/authentication/reset-password-6';


/**
 * Handles all authentication requests
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
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

  /** Path part for operation `resetPassword()` */
  static readonly ResetPasswordPath = '/auth/resetPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword$Response(params?: ResetPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return resetPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword(params?: ResetPassword$Params, context?: HttpContext): Observable<string> {
    return this.resetPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `resetPassword3()` */
  static readonly ResetPassword3Path = '/auth/resetPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword3()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword3$Response(params?: ResetPassword3$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return resetPassword3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword3(params?: ResetPassword3$Params, context?: HttpContext): Observable<string> {
    return this.resetPassword3$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `resetPassword2()` */
  static readonly ResetPassword2Path = '/auth/resetPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword2()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword2$Response(params?: ResetPassword2$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return resetPassword2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword2(params?: ResetPassword2$Params, context?: HttpContext): Observable<string> {
    return this.resetPassword2$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `resetPassword5()` */
  static readonly ResetPassword5Path = '/auth/resetPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword5()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword5$Response(params?: ResetPassword5$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return resetPassword5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword5(params?: ResetPassword5$Params, context?: HttpContext): Observable<string> {
    return this.resetPassword5$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `resetPassword6()` */
  static readonly ResetPassword6Path = '/auth/resetPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword6()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword6$Response(params?: ResetPassword6$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return resetPassword6(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword6(params?: ResetPassword6$Params, context?: HttpContext): Observable<string> {
    return this.resetPassword6$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `resetPassword1()` */
  static readonly ResetPassword1Path = '/auth/resetPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword1()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword1$Response(params?: ResetPassword1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return resetPassword1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword1(params?: ResetPassword1$Params, context?: HttpContext): Observable<string> {
    return this.resetPassword1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `resetPassword4()` */
  static readonly ResetPassword4Path = '/auth/resetPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword4()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword4$Response(params?: ResetPassword4$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return resetPassword4(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword4(params?: ResetPassword4$Params, context?: HttpContext): Observable<string> {
    return this.resetPassword4$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
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

  /** Path part for operation `forgotPassword()` */
  static readonly ForgotPasswordPath = '/auth/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword$Response(params?: ForgotPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return forgotPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword(params?: ForgotPassword$Params, context?: HttpContext): Observable<string> {
    return this.forgotPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `forgotPassword3()` */
  static readonly ForgotPassword3Path = '/auth/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword3()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword3$Response(params?: ForgotPassword3$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return forgotPassword3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword3(params?: ForgotPassword3$Params, context?: HttpContext): Observable<string> {
    return this.forgotPassword3$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `forgotPassword2()` */
  static readonly ForgotPassword2Path = '/auth/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword2()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword2$Response(params?: ForgotPassword2$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return forgotPassword2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword2(params?: ForgotPassword2$Params, context?: HttpContext): Observable<string> {
    return this.forgotPassword2$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `forgotPassword5()` */
  static readonly ForgotPassword5Path = '/auth/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword5()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword5$Response(params?: ForgotPassword5$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return forgotPassword5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword5(params?: ForgotPassword5$Params, context?: HttpContext): Observable<string> {
    return this.forgotPassword5$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `forgotPassword6()` */
  static readonly ForgotPassword6Path = '/auth/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword6()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword6$Response(params?: ForgotPassword6$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return forgotPassword6(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword6(params?: ForgotPassword6$Params, context?: HttpContext): Observable<string> {
    return this.forgotPassword6$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `forgotPassword1()` */
  static readonly ForgotPassword1Path = '/auth/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword1()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword1$Response(params?: ForgotPassword1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return forgotPassword1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword1(params?: ForgotPassword1$Params, context?: HttpContext): Observable<string> {
    return this.forgotPassword1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `forgotPassword4()` */
  static readonly ForgotPassword4Path = '/auth/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword4()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword4$Response(params?: ForgotPassword4$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return forgotPassword4(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword4(params?: ForgotPassword4$Params, context?: HttpContext): Observable<string> {
    return this.forgotPassword4$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
