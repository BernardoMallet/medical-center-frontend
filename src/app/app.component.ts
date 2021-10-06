import { Component } from '@angular/core';
import { AuthguardService } from './authentication/authguard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medical-center';


  constructor(public authService: AuthguardService){
  }
}
