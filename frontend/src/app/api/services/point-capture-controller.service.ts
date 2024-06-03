/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addCircuit } from '../fn/point-capture-controller/add-circuit';
import { AddCircuit$Params } from '../fn/point-capture-controller/add-circuit';
import { addPointCapture } from '../fn/point-capture-controller/add-point-capture';
import { AddPointCapture$Params } from '../fn/point-capture-controller/add-point-capture';
import { CircuitAllResponse } from '../models/circuit-all-response';
import { getAllCircuits } from '../fn/point-capture-controller/get-all-circuits';
import { GetAllCircuits$Params } from '../fn/point-capture-controller/get-all-circuits';
import { getAllPointsCapture } from '../fn/point-capture-controller/get-all-points-capture';
import { GetAllPointsCapture$Params } from '../fn/point-capture-controller/get-all-points-capture';
import { PointsCaptureAllResponse } from '../models/points-capture-all-response';

@Injectable({ providedIn: 'root' })
export class PointCaptureControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addPointCapture()` */
  static readonly AddPointCapturePath = '/point-capture/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPointCapture()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPointCapture$Response(params: AddPointCapture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return addPointCapture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addPointCapture$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPointCapture(params: AddPointCapture$Params, context?: HttpContext): Observable<{
}> {
    return this.addPointCapture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `addCircuit()` */
  static readonly AddCircuitPath = '/point-capture/add-circuit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCircuit()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCircuit$Response(params: AddCircuit$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return addCircuit(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addCircuit$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCircuit(params: AddCircuit$Params, context?: HttpContext): Observable<{
}> {
    return this.addCircuit$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllPointsCapture()` */
  static readonly GetAllPointsCapturePath = '/point-capture/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPointsCapture()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPointsCapture$Response(params?: GetAllPointsCapture$Params, context?: HttpContext): Observable<StrictHttpResponse<PointsCaptureAllResponse>> {
    return getAllPointsCapture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPointsCapture$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPointsCapture(params?: GetAllPointsCapture$Params, context?: HttpContext): Observable<PointsCaptureAllResponse> {
    return this.getAllPointsCapture$Response(params, context).pipe(
      map((r: StrictHttpResponse<PointsCaptureAllResponse>): PointsCaptureAllResponse => r.body)
    );
  }

  /** Path part for operation `getAllCircuits()` */
  static readonly GetAllCircuitsPath = '/point-capture/all-circuits';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCircuits()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCircuits$Response(params?: GetAllCircuits$Params, context?: HttpContext): Observable<StrictHttpResponse<CircuitAllResponse>> {
    return getAllCircuits(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCircuits$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCircuits(params?: GetAllCircuits$Params, context?: HttpContext): Observable<CircuitAllResponse> {
    return this.getAllCircuits$Response(params, context).pipe(
      map((r: StrictHttpResponse<CircuitAllResponse>): CircuitAllResponse => r.body)
    );
  }

}