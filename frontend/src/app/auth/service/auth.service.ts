import { HttpClient } from '@angular/common/http';
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
}
