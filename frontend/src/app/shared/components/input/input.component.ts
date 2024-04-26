import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit{
  @Input() control: FormControl = new FormControl();
  @Input() placeholder?: string = '';
  @Input() type?: string = 'text';
  @Input() format?: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
