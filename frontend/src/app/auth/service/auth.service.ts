import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginPayload:any){
    return this.http.post('http://localhost:8080/api/auth/login', loginPayload, {responseType: 'text'});
  }

  register(registerPayload:any){
    return this.http.post('http://localhost:8080/api/auth/register', registerPayload, {responseType: 'text'});
  }
}
