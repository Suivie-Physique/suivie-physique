/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MemberResponse } from '../../models/member-response';

export interface GetMembers$Params {
}

export function getMembers(http: HttpClient, rootUrl: string, params?: GetMembers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MemberResponse>>> {
  const rb = new RequestBuilder(rootUrl, getMembers.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<MemberResponse>>;
    })
  );
}

getMembers.PATH = '/users/members';
