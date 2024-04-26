
export class User{

  public id: number | undefined;
  public name: string | undefined;
  public email : string | undefined;
  public password: string | undefined;
  public role : string | undefined;
  public statusCd: string | undefined;
  public statusMsg : string | undefined;
  public authStatus : string | undefined;


  constructor(id?: number,name?: string, email?: string,  password?: string,role?: string,
              statusCd?:string,statusMsg?:string, authStatus?:string){
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.statusCd = statusCd;
    this.statusMsg = statusMsg;
    this.authStatus = authStatus;
  }

}
