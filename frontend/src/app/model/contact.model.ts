export class Contact {

  public contactId: string | undefined;
  public contactName: string | undefined;
  public contactEmail: string | undefined;
  public subject: string | undefined;
  public message: string | undefined;

  constructor(contactId?: string,contactName?: string,contactEmail?: string,
              subject?: string,message?: string){
    this.contactId = contactId;
    this.contactName = contactName;
    this.contactEmail = contactEmail;
    this.subject = subject;
    this.message = message;

  }

}
