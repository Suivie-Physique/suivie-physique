
export class AccountTransactions {

  public accountNumber: number | undefined;
  public customerId: number | undefined;
  public transactionDt: Date | undefined;
  public transactionSummary: string | undefined;
  public transactionType: string | undefined;
  public transactionAmt: number | undefined;
  public closingBalance: number | undefined;

  constructor(accountNumber?: number,customerId?: number,transactionDt?: Date, transactionSummary?: string,
              transactionType?: string,transactionAmt?: number, closingBalance?: number){
    this.accountNumber = accountNumber;
    this.customerId = customerId;
    this.transactionDt = transactionDt;
    this.transactionSummary = transactionSummary;
    this.transactionType = transactionType;
    this.transactionAmt = transactionAmt;
    this.closingBalance = closingBalance;
  }

}
