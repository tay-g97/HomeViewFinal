export class PropertyCreate {
  constructor(
    public propertyId: number,

    public propertyname: string,

    public guideprice: number,

    public propertytype: string,

    public description: string,

    public bedrooms: number,

    public bathrooms: number,

    public addressline1: string,

    public addressline2: string,

    public addressline3: string,

    public town: string,

    public city: string,

    public postcode: string
  ) {}
}
