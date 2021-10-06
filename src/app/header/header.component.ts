import { Component, OnInit } from '@angular/core';
import { AuthguardService } from '../authentication/authguard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthguardService) { }

  ngOnInit(): void {
  }


  logout(){
    this.authService.logout();
  }

}
