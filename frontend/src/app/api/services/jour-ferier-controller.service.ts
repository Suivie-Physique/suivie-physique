/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addJourFerier } from '../fn/jour-ferier-controller/add-jour-ferier';
import { AddJourFerier$Params } from '../fn/jour-ferier-controller/add-jour-ferier';
import { getAllJourFerier } from '../fn/jour-ferier-controller/get-all-jour-ferier';
import { GetAllJourFerier$Params } from '../fn/jour-ferier-controller/get-all-jour-ferier';
import { JourFerierData } from '../models/jour-ferier-data';
import { syncJourFerier } from '../fn/jour-ferier-controller/sync-jour-ferier';
import { SyncJourFerier$Params } from '../fn/jour-ferier-controller/sync-jour-ferier';

@Injectable({ providedIn: 'root' })
export class JourFerierControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addJourFerier()` */
  static readonly AddJourFerierPath = '/jour-ferier/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addJourFerier()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addJourFerier$Response(params: AddJourFerier$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return addJourFerier(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addJourFerier$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addJourFerier(params: AddJourFerier$Params, context?: HttpContext): Observable<{
}> {
    return this.addJourFerier$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `syncJourFerier()` */
  static readonly SyncJourFerierPath = '/jour-ferier/sync';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `syncJourFerier()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  syncJourFerier$Response(params: SyncJourFerier$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return syncJourFerier(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `syncJourFerier$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  syncJourFerier(params: SyncJourFerier$Params, context?: HttpContext): Observable<{
}> {
    return this.syncJourFerier$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllJourFerier()` */
  static readonly GetAllJourFerierPath = '/jour-ferier/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllJourFerier()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllJourFerier$Response(params?: GetAllJourFerier$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<JourFerierData>>> {
    return getAllJourFerier(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllJourFerier$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllJourFerier(params?: GetAllJourFerier$Params, context?: HttpContext): Observable<Array<JourFerierData>> {
    return this.getAllJourFerier$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<JourFerierData>>): Array<JourFerierData> => r.body)
    );
  }

}
