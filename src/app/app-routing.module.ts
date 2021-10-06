import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './authentication/authguard.service';
import { LoginComponent } from './login/login.component';
import { PatientNewComponent } from './patient-new/patient-new.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
	{
		path: "login",
		component: LoginComponent
	},

	{
		path: "signup",
		component: SignUpComponent
	},
	{
		path: "patient/new",
		component: PatientNewComponent,
		canActivate: [AuthguardService],
	},
	{
		path: "patient/view",
		component: PatientViewComponent,
		canActivate: [AuthguardService],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
