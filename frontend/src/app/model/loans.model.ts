export class Loans {

  public loanNumber: number | undefined;
  public customerId: number | undefined;
  public startDt: Date | undefined;
  public loanType: string | undefined;
  public totalLoan: number | undefined;
  public amountPaid: number | undefined;
  public outstandingAmount: number | undefined;

  constructor(loanNumber?: number,customerId?: number,startDt?: Date, loanType?: string,
              totalLoan?: number,amountPaid?: number, outstandingAmount?: number){
    this.loanNumber = loanNumber;
    this.customerId = customerId;
    this.startDt = startDt;
    this.loanType = loanType;
    this.totalLoan = totalLoan;
    this.amountPaid = amountPaid;
    this.outstandingAmount = outstandingAmount;
  }

}
