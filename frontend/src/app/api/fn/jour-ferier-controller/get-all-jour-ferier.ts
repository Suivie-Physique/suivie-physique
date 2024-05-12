/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JourFerierData } from '../../models/jour-ferier-data';

export interface GetAllJourFerier$Params {
}

export function getAllJourFerier(http: HttpClient, rootUrl: string, params?: GetAllJourFerier$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<JourFerierData>>> {
  const rb = new RequestBuilder(rootUrl, getAllJourFerier.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<JourFerierData>>;
    })
  );
}

getAllJourFerier.PATH = '/jour-ferier/all';
