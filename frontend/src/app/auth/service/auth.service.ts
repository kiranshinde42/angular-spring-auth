import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  server: String;
  constructor(private http: HttpClient) {
    this.server = environment.SERVER;
  }

  login(loginPayload: any) {
    return this.http.post(this.server + '/api/auth/login', loginPayload);
  }

  register(registerPayload: any) {
    return this.http.post(this.server + '/api/auth/register', registerPayload);
  }

  authLogin(idToken) {
    const httpOptions = {
      headers: new HttpHeaders({
        idToken: 'Bearer ' + idToken,
      }),
    };
    return this.http.get(this.server + '/api/auth/authorize', httpOptions);
  }
}
