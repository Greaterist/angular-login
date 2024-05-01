import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ILogin } from '../interfaces/ILogin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://65ccb76ddd519126b83f5e93.mockapi.io/login';
  constructor(private http: HttpClient) { }

  login(login: string): Observable<ILogin> {
    return this.http
      .get<ILogin[]>(`${this.baseUrl}/`)
      .pipe(
        map(users => {
          const user = users.find(u => u.login === login);
          if (user) {
            return user;
          } else {
            throw new Error('Пользователь не найден');
          }
        }),
        catchError(error => {
          console.error('Error fetching user:', error);
          return throwError(() => error);
        })
      )

        
  };

}
