import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientFilterDTO } from '../entities/patient-filter.dto';
import { PatientDTO } from '../entities/patient.dto';
import { PatientResult } from '../entities/result/patient.result';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseUrl: string = environment.urlApi;

  constructor(private http: HttpClient) { }

  save(dto: PatientDTO) {
    return this.http.post(this.baseUrl + '/patient', dto);
  }

  getAllFiltered(page: number, patientFilterDTO: PatientFilterDTO | null):Observable<PatientResult>{
    return this.http.post<PatientResult>(this.baseUrl + '/patient/find/filter/'+page, patientFilterDTO);
  }

}
