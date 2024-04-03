export class Account {

  public customerId: number | undefined;
  public accountNumber: number | undefined
  public accountType: string | undefined;
  public branchAddress: string | undefined;
  constructor(customerId?: number,accountNumber?: number,accountType?: string, branchAddress?: string){
    this.customerId = customerId;
    this.accountNumber = accountNumber;
    this.accountType = accountType;
    this.branchAddress = branchAddress;
  }
}
