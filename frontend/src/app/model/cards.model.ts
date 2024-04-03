export class Cards {

  public cardNumber: string | undefined;
  public customerId: number | undefined;
  public cardType: string | undefined;
  public totalLimit: number | undefined;
  public amountUsed: number | undefined;
  public availableAmount: number | undefined;

  constructor(cardNumber?: string,customerId?: number,cardType?: string,
              totalLimit?: number,amountUsed?: number, availableAmount?: number){
    this.cardNumber = cardNumber;
    this.customerId = customerId;
    this.cardType = cardType;
    this.totalLimit = totalLimit;
    this.amountUsed = amountUsed;
    this.availableAmount = availableAmount;
  }

}
