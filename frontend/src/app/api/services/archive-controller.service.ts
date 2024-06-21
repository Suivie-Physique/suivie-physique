/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ArchiveResponse } from '../models/archive-response';
import { getAllArchives } from '../fn/archive-controller/get-all-archives';
import { GetAllArchives$Params } from '../fn/archive-controller/get-all-archives';

@Injectable({ providedIn: 'root' })
export class ArchiveControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllArchives()` */
  static readonly GetAllArchivesPath = '/archive/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllArchives()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArchives$Response(params?: GetAllArchives$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ArchiveResponse>>> {
    return getAllArchives(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllArchives$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArchives(params?: GetAllArchives$Params, context?: HttpContext): Observable<Array<ArchiveResponse>> {
    return this.getAllArchives$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ArchiveResponse>>): Array<ArchiveResponse> => r.body)
    );
  }

}
