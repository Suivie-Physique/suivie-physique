/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PointCaptureStatsResponse } from '../../models/point-capture-stats-response';

export interface GetPointsCaptureStats$Params {
}

export function getPointsCaptureStats(http: HttpClient, rootUrl: string, params?: GetPointsCaptureStats$Params, context?: HttpContext): Observable<StrictHttpResponse<PointCaptureStatsResponse>> {
  const rb = new RequestBuilder(rootUrl, getPointsCaptureStats.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PointCaptureStatsResponse>;
    })
  );
}

getPointsCaptureStats.PATH = '/point-capture/pdc-stats';
