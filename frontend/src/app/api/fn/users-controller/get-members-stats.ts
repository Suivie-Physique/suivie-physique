/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MembersStatsResponse } from '../../models/members-stats-response';

export interface GetMembersStats$Params {
}

export function getMembersStats(http: HttpClient, rootUrl: string, params?: GetMembersStats$Params, context?: HttpContext): Observable<StrictHttpResponse<MembersStatsResponse>> {
  const rb = new RequestBuilder(rootUrl, getMembersStats.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MembersStatsResponse>;
    })
  );
}

getMembersStats.PATH = '/users/members-stats';
