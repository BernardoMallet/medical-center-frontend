import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginDTO } from '../entities/Login.dto';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  submitRequested: boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private service: LoginService, private router: Router) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  submitForm() {
    this.submitRequested = true;
    if (this.form.valid) {
      var userName: AbstractControl | null = this.form.get('userName');
      var password: AbstractControl | null = this.form.get('password');

      var loginDTO: LoginDTO = new LoginDTO(userName?.value, password?.value);

      this.service.doLogin(loginDTO).subscribe(data => {
        sessionStorage.setItem('USER_LOGGED', JSON.stringify(data));
        this.router.navigate(['/patient/view']);
      }, error => {
        console.log('error', error);
        this.snackBar.open('Login ou senha inválidos', '', { duration: 5000, panelClass: ['snackbar-error'] });
      });
    }
  }


}
