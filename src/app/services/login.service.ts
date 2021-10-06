import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../entities/Login.dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserDTO } from '../entities/User.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = environment.urlApi;

  constructor(private http: HttpClient) { }

  doLogin(dto: LoginDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.baseUrl + '/user/login', dto);
  }

  save(dto: UserDTO) {
    return this.http.post<void>(this.baseUrl + '/user', dto);
  }

}
