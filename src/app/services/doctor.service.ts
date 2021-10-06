import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DoctorDTO } from '../entities/doctor.dto';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseUrl: string = environment.urlApi;

  constructor(private http: HttpClient) { }

  getAllDoctors():Observable<DoctorDTO[]>{
    return this.http.get<DoctorDTO[]>(this.baseUrl+'/doctor');
  }
}
