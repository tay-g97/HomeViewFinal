export class Property {
  constructor(
    public propertyId: number,
    public guideprice: number,
    public addressline1: string,
    public city: string,
    public postcode: string,
    public imageUrl: string,
    public bedrooms: number,
    public description: string
  ) {}
}
