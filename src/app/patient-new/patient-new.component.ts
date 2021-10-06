import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorDTO } from '../entities/doctor.dto';
import { PatientDTO } from '../entities/patient.dto';
import { StateDTO } from '../entities/states.dto';
import { CepService } from '../services/cep.service';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-new',
  templateUrl: './patient-new.component.html',
  styleUrls: ['./patient-new.component.css']
})
export class PatientNewComponent implements OnInit {

  form: FormGroup;

  doctors: DoctorDTO[] = [];

  states: StateDTO[] = [];
  cities: any | undefined;

  selectedState: StateDTO | undefined;
  selectedCity: string | undefined;

  submitRequested: boolean = false;


  constructor(private cepService: CepService,
    private fb: FormBuilder, private doctorService: DoctorService,
    private patientService: PatientService, private snackBar: MatSnackBar) {

    this.form = this.fb.group({
      doctor: ['', Validators.required],
      cpf: ['', Validators.required],
      name: ['', Validators.required],
      cep: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      complement: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      obs: [''],
    });

    this.states = this.cepService.getJsonStateAndCitty();
  }

  ngOnInit(): void {
    this.loadStateAndYourCities('AC');

    this.selectedCity = 'Acrelândia';
    this.form.get('city')?.setValue('Acrelândia');

    this.loadDoctors();
  }

  submit() {
    this.submitRequested = true;
    if (this.form.valid) {

      var patient: PatientDTO = new PatientDTO();

      patient.doctor = this.form.get('doctor')?.value;
      patient.cpf = this.form.get('cpf')?.value;
      patient.name = this.form.get('name')?.value;
      patient.cep = this.form.get('cep')?.value;
      patient.address = this.form.get('street')?.value;
      patient.number = this.form.get('number')?.value;
      patient.neighborhood = this.form.get('neighborhood')?.value;
      patient.complement = this.form.get('complement')?.value;
      patient.state = (this.form.get('state')?.value).sigla;
      patient.city = this.form.get('city')?.value;
      patient.obs = this.form.get('obs')?.value;

      this.patientService.save(patient).subscribe(() => {
        this.submitRequested = false;
        this.clearForm();
        this.snackBar.open('Cadastrado com sucesso', '', { duration: 5000, panelClass: ['snackbar-success'] });
      }, error => {
        console.log('error', error);
      });


    }
  }

  loadAddress() {
    var cep: AbstractControl | null = this.form.get('cep');
    this.cepService.getAddressByCep(cep?.value).subscribe(data => {
      this.form.get('street')?.setValue(data.logradouro);
      this.form.get('neighborhood')?.setValue(data.bairro);
      this.loadStateAndYourCities(data.uf);

      this.selectedCity = data.localidade;
      this.form.get('city')?.setValue(data.localidade);

    }, error => {
      console.log('error', error);
    });
  }


  loadStateAndYourCities(uf: string | undefined) {
    var state: StateDTO = this.getState(uf);
    this.selectedState = state;
    this.form.get('state')?.setValue(state);
    this.loadCities();
  }


  loadCities() {
    var state: StateDTO = this.form.get('state')?.value;
    this.cities = state?.cidades;
    console.log('state', state);
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe(data => {
      this.doctors = data;
      console.log('this.doctors', this.doctors);

    }, error => {
      console.log('error', error);
    });
  }

  getState(state: string | undefined) {
    return this.states.filter(s => s.sigla === state)[0];
  }

  clearForm(){
    this.form.reset();
    this.ngOnInit();
  };

}
