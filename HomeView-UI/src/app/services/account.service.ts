import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin } from '../models/account/user-login.model';
import { User } from '../models/account/user.model';
import { UserCreate } from '../models/account/user-create.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSubject$: BehaviorSubject<User>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject$ = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('homeView-currentUser'))
    );
  }

  login(model: UserLogin): Observable<User> {
    return this.http.post(`${environment.webApi}/Account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('homeView-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }

        return user;
      })
    );
  }

  register(model: UserCreate): Observable<User> {
    return this.http.post(`${environment.webApi}/Account/register`, model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('homeView-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }

        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSubject$.next(user);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject$.value;
  }

  public isLoggedIn() {
    const currentUser = this.currentUserValue;
    const isLoggedIn = !!currentUser && !!currentUser.token;
    return isLoggedIn;
  }

  logout() {
    localStorage.removeItem('homeView-currentUser');
    this.currentUserSubject$.next(null);
  }

  updatePhoto(photoId: number) : Observable<any>{
    const currentUser = this.currentUserValue;
    return this.http.put(`${environment.webApi}/Account/updatepicture/${photoId}`, null, {responseType: 'text'});
  }
}
