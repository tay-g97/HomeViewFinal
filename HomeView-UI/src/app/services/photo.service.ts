import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfilePhoto } from '../models/profile-photo/profile-photo.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private http: HttpClient
  ) { }

  create(model: FormData) : Observable<ProfilePhoto> {
    return this.http.post<ProfilePhoto>(`${environment.webApi}/Profilephoto`, model);
  }

  getByUserId() : Observable<ProfilePhoto[]> {
    return this.http.get<ProfilePhoto[]>(`${environment.webApi}/Profilephoto/user/`);
  }

  get(photoId: number) : Observable<ProfilePhoto> {
    return this.http.get<ProfilePhoto>(`${environment.webApi}/Profilephoto/${photoId}`);
  }

  delete(photoId: number) : Observable<number>{
    return this.http.delete<number>(`${environment.webApi}/Profilephoto/delete/${photoId}`);
  }
}
