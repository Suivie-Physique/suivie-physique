import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
    @Input() showModal: boolean = false;
    @Input() title: string = 'Modal Title';
    @Input() message: string = 'Modal Message';
    @Input() color: string = 'red';

    constructor() { }

    toggleModal(): void {
      this.showModal = !this.showModal;
    }


}
