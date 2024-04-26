import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-center',
  templateUrl: './card-center.component.html'
})
export class CardCenterComponent implements OnInit{
  @Input() title: string = 'Card Title';
  @Input() titleColor: string = 'sky';
  @Input() description: string = 'Card Description';

  constructor() { }

  ngOnInit(): void {}
}
