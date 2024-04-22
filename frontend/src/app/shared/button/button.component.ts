import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit{

  @Input() isDisabled: boolean = true;
  @Input() label: string = '';

  constructor() { }

  ngOnInit(): void {}

  onClick(): void {
    console.log('Button clicked');
  }

}
