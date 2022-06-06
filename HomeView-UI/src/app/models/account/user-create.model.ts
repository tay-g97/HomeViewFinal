export class UserCreate {
  constructor(
    public Firstname: string,
    public Lastname: string,
    public Dateofbirth: string,
    public Addressline1: string,
    public Addressline2: string,
    public Addressline3: string,
    public Town: string,
    public City: string,
    public Postcode: string,
    public Accounttype: string,
    public Email: string,
    public Phone: string,
    public MarketingEmail: string,
    public MarketingPhone: boolean,
    public Username: string,
    public Password: string,
    public profilepictureId?: number
  ) {}
}
