export class Property {
  constructor(
    public propertyId: number,

    public propertyname: string,

    public guideprice: number,

    public propertytype: string,

    public description: string,

    public bedrooms: number,

    public bathrooms: number,

    public icons: string,

    public addressline1: string,

    public addressline2: string,

    public addressline3: string,

    public town: string,

    public city: string,

    public postcode: string,

    public deleteConfirm: boolean = false,

    public updateDate: Date,

    public publishDate: Date,

    public userId: number,

    public username: string
  ) {}
}
