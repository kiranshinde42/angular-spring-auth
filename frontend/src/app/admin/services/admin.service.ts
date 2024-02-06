import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from 'src/app/shared-module/services/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  server: String;
  constructor(private http: HttpClient) {
    this.server = environment.SERVER;
  }

  deleteUser(id) {
    return this.http.delete('http://localhost:8080/api/admin/user/' + id);
  }

  updateUser(user) {
    return this.http.put('http://localhost:8080/api/admin/user', user);
  }
}
