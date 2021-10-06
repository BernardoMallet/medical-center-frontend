import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDTO } from '../entities/User.dto';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  submitRequested: boolean = false;

  passwordsAreDifferent: boolean = false;

  constructor(private fb: FormBuilder, private service: LoginService, private snackBar: MatSnackBar) {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      cpf: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      gener: ['M'],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }


  submitForm($event: any) {

    this.submitRequested = true;

    if (this.form.valid) {

      var name = this.form.get('name')?.value;
      var cpf = this.form.get('cpf')?.value;
      var mail = this.form.get('mail')?.value;
      var gener = this.form.get('gener')?.value;
      var phone = this.form.get('phone')?.value;
      var password = this.form.get('password')?.value;
      var repassword = this.form.get('repassword')?.value;

      if(password !== repassword){

        this.passwordsAreDifferent = true;

      }else{

        this.passwordsAreDifferent = false;

      var user: UserDTO = new UserDTO();
      user.email = mail;
      user.cpf = cpf;
      user.name = name;
      user.password = password;
      user.gener = gener;
      user.phone = phone;

      console.log(user);

      this.service.save(user).subscribe(data => {
        console.log('sucesso...', data);
        this.snackBar.open('Cadastrado com sucesso', '', { duration: 5000, panelClass: ['snackbar-success'] });

        this.form.reset();
        this.form.get('gener')?.setValue('M');
        this.submitRequested = false;

      }, error => {
        console.log('error', error);
        this.snackBar.open('Login ou senha inválidos', '', { duration: 5000, panelClass: ['snackbar-error'] });
      });

      }
      

    }

  }

}
