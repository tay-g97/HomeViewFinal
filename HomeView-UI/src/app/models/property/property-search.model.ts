export class PropertySearch {
  constructor(
    public location: string = null,
    public propertyType: string = null,
    public keywords: string = null,
    public minPrice: number = 1,
    public maxPrice: number = 10000000,
    public minBeds: number = 1,
    public maxBeds: number = 1000
  ) {}
}
