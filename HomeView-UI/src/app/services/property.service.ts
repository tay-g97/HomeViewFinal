import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PropertyCreate } from '../models/property/property-create.model';
import { Property } from '../models/property/property.model';
import { PropertySearch } from '../models/property/property-search.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  search(propertySearch: PropertySearch): Observable<Property[]> {
    // return this.http.post<Property[]>(`${environment.webApi}/Property/search`, {
    //   Location: JSON.parse(propertySearch.Location),
    //   PropertyType: JSON.parse(propertySearch.PropertyType),
    //   Keywords: JSON.parse(propertySearch.Keywords),
    //   MinBed: JSON.parse(propertySearch.Location),
    // });
    return this.http.post<Property[]>(
      `${environment.webApi}/Property/search`,
      propertySearch
    );
  }
  create(model: PropertyCreate): Observable<Property> {
    return this.http.post<Property>(`${environment.webApi}/Property`, model);
  }

  getAll() {}

  get(propertyId: number): Observable<Property> {
    return this.http.get<Property>(
      `${environment.webApi}/Property/${propertyId}`
    );
  }

  getByApplicationUserId(userId: number): Observable<Property[]> {
    return this.http.get<Property[]>(
      `${environment.webApi}/Property/user/${userId}`
    );
  }

  delete() {}
}
