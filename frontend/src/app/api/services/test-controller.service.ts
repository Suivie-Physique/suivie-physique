/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { delete$ } from '../fn/test-controller/delete';
import { Delete$Params } from '../fn/test-controller/delete';
import { get } from '../fn/test-controller/get';
import { Get$Params } from '../fn/test-controller/get';
import { post } from '../fn/test-controller/post';
import { Post$Params } from '../fn/test-controller/post';
import { put } from '../fn/test-controller/put';
import { Put$Params } from '../fn/test-controller/put';

@Injectable({ providedIn: 'root' })
export class TestControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `get()` */
  static readonly GetPath = '/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params?: Get$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return get(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params?: Get$Params, context?: HttpContext): Observable<string> {
    return this.get$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `put()` */
  static readonly PutPath = '/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `put()` instead.
   *
   * This method doesn't expect any request body.
   */
  put$Response(params?: Put$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return put(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `put$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  put(params?: Put$Params, context?: HttpContext): Observable<string> {
    return this.put$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `post()` */
  static readonly PostPath = '/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `post()` instead.
   *
   * This method doesn't expect any request body.
   */
  post$Response(params?: Post$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return post(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `post$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  post(params?: Post$Params, context?: HttpContext): Observable<string> {
    return this.post$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `delete()` */
  static readonly DeletePath = '/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params?: Delete$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete$(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params?: Delete$Params, context?: HttpContext): Observable<string> {
    return this.delete$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
