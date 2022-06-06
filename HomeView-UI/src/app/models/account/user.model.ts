export class User {
  constructor(
    public UserId: number,
    public Username: string,
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
    public ProfilepictureId: number,
    public Token: string
  ) {}
}
