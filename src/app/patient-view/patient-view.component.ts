import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientFilterDTO } from '../entities/patient-filter.dto';
import { PatientDTO } from '../entities/patient.dto';
import { PatientResult } from '../entities/result/patient.result';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {

  form: FormGroup;

  result: PatientResult | undefined;

  patient: PatientDTO[] = [];

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.form = this.fb.group({
      filter: ['']
    });
  }

  ngOnInit(): void {
    this.loadPatients(0);
  }

  loadPatients(page: number) {
    var filter: PatientFilterDTO = new PatientFilterDTO;
    filter.cpf = this.form.get('filter')?.value;
    filter.doctorName = this.form.get('filter')?.value;
    filter.name = this.form.get('filter')?.value;
    this.patientService.getAllFiltered(page, filter).subscribe(
      data => {
          this.result = data;
          this.patient = this.result?.content;
          console.log(this.patient);
          
      }, error => {
        console.log(error);

      }

    );
  }

  nextPage($event: any){
    this.loadPatients($event.pageIndex);
  }

}
