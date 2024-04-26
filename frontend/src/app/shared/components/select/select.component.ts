import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit{
  @Input() control: FormControl = new FormControl();
  @Input() options?: any[] = [];
  @Input() value: string = 'user';

  constructor() { }

  ngOnInit(): void {
  }

}
