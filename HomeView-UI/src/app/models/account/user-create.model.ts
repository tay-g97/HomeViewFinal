export class UserCreate {
  constructor(
    public firstname: string,
    public lastname: string,
    public dateofbirth: string,
    public addressline1: string,
    public addressline2: string,
    public addressline3: string,
    public town: string,
    public city: string,
    public postcode: string,
    public accounttype: string,
    public email: string,
    public phone: string,
    public marketingEmail: boolean,
    public marketingPhone: boolean,
    public username: string,
    public password: string,
    public profilepictureId?: number
  ) {}
}
