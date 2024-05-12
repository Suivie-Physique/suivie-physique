import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowModalService {
  private _buttonClick = new Subject<any>();
  buttonClick$ = this._buttonClick.asObservable();

  buttonClicked(data: any) {
    this._buttonClick.next(data);
  }
}