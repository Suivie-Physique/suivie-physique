/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ArchiveResponse } from '../../models/archive-response';

export interface GetAllArchives$Params {
}

export function getAllArchives(http: HttpClient, rootUrl: string, params?: GetAllArchives$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ArchiveResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllArchives.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ArchiveResponse>>;
    })
  );
}

getAllArchives.PATH = '/archive/all';
