import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ilogin } from '../interfaces/ilogin.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://65ccb76ddd519126b83f5e93.mockapi.io/login';
  constructor(private http: HttpClient) {}

  public login(login: string): Observable<ilogin> {
    return this.http.get<ilogin[]>(`${this.baseUrl}/`).pipe(
      map((users) => {
        const user = users.find((item) => item.login === login);
        if (user) {
          return user;
        } else {
          throw new Error('Пользователь не найден');
        }
      }),
      catchError((error) => {
        console.error('Error fetching user:', error);
        return throwError(() => error);
      })
    );
  }
}
