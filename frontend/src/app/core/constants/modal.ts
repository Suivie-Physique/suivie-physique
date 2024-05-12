import { ModalItem } from "../model/modal.model";


export class Modal {
    private modalItem: ModalItem;
    constructor() {
        this.modalItem = {
            showModal: false,
            alertTitle: '',
            alertMessage: '',
            alertColor: ''
        }
    }

    handleModal(showModal: boolean = false, alertTitle: string = '', alertMessage: string = '', alertColor: string = 'red') {
        this.modalItem.showModal = showModal;
        this.modalItem.alertTitle = alertTitle;
        this.modalItem.alertMessage = alertMessage;
        this.modalItem.alertColor = alertColor;
    }

    get showModal(): boolean {
        return this.modalItem.showModal;
    }
    get alertTitle(): string {
        return this.modalItem.alertTitle;
    }
    get alertMessage(): string {
        return this.modalItem.alertMessage;
    }
    get alertColor(): string {
        return this.modalItem.alertColor;
    }
    set showModal(showModal: boolean) {
        this.modalItem.showModal = showModal;
    }
    set alertTitle(alertTitle: string) {
        this.modalItem.alertTitle = alertTitle;
    }
    set alertMessage(alertMessage: string) {
        this.modalItem.alertMessage = alertMessage;
    }
    set alertColor(alertColor: string) {
        this.modalItem.alertColor = alertColor;
    }
}
