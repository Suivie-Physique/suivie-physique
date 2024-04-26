import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html'
})
export class ToolTipComponent implements OnInit{

  @Input() message: string = 'This is a tooltip';
  @Input() color: string = 'red';

  showToolTip: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleToolTip(): void {
    this.showToolTip = !this.showToolTip;
  }


}
