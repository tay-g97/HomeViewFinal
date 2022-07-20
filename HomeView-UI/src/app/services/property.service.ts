import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Property } from '../models/property/property.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

  // search(propertySearch: PropertySearch) {
  //   return this.http.post<Property[]>(`${environment.webApi}/Property/search`, {
  //     ['Location']: propertySearch.Location,
  //     ['PropertyType']: propertySearch.PropertyType,
  //     ['Keywords']: propertySearch.Keywords,
  //     ['MinBed']: propertySearch.Location,
  //   });
  // }
}
