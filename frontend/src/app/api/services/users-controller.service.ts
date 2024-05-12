/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { changeEmail } from '../fn/users-controller/change-email';
import { ChangeEmail$Params } from '../fn/users-controller/change-email';
import { changeMember } from '../fn/users-controller/change-member';
import { ChangeMember$Params } from '../fn/users-controller/change-member';
import { changePassword } from '../fn/users-controller/change-password';
import { ChangePassword$Params } from '../fn/users-controller/change-password';
import { changeRole } from '../fn/users-controller/change-role';
import { ChangeRole$Params } from '../fn/users-controller/change-role';
import { changeStatus } from '../fn/users-controller/change-status';
import { ChangeStatus$Params } from '../fn/users-controller/change-status';
import { getMembers } from '../fn/users-controller/get-members';
import { GetMembers$Params } from '../fn/users-controller/get-members';
import { MemberResponse } from '../models/member-response';

@Injectable({ providedIn: 'root' })
export class UsersControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `changeStatus()` */
  static readonly ChangeStatusPath = '/users/change-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStatus$Response(params: ChangeStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return changeStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStatus(params: ChangeStatus$Params, context?: HttpContext): Observable<{
}> {
    return this.changeStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `changeRole()` */
  static readonly ChangeRolePath = '/users/change-role';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeRole$Response(params: ChangeRole$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return changeRole(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeRole(params: ChangeRole$Params, context?: HttpContext): Observable<{
}> {
    return this.changeRole$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `changePassword()` */
  static readonly ChangePasswordPath = '/users/change-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: ChangePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return changePassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: ChangePassword$Params, context?: HttpContext): Observable<{
}> {
    return this.changePassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `changeMember()` */
  static readonly ChangeMemberPath = '/users/change-member';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeMember()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeMember$Response(params: ChangeMember$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return changeMember(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeMember$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeMember(params: ChangeMember$Params, context?: HttpContext): Observable<{
}> {
    return this.changeMember$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `changeEmail()` */
  static readonly ChangeEmailPath = '/users/change-email';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeEmail()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeEmail$Response(params: ChangeEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return changeEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeEmail$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeEmail(params: ChangeEmail$Params, context?: HttpContext): Observable<{
}> {
    return this.changeEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getMembers()` */
  static readonly GetMembersPath = '/users/members';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMembers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMembers$Response(params?: GetMembers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MemberResponse>>> {
    return getMembers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMembers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMembers(params?: GetMembers$Params, context?: HttpContext): Observable<Array<MemberResponse>> {
    return this.getMembers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MemberResponse>>): Array<MemberResponse> => r.body)
    );
  }

}
