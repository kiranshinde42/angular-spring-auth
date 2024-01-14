import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  server: String;
  constructor(private http: HttpClient) {
    this.server = environment.SERVER;
  }

  getUsers() {
    return this.http.get('http://localhost:8080/api/admin/users');
  }

  getMenus() {
    return this.http.get('http://localhost:8080/api/dashboard/menu');
  }
}
