import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  constructor(public authService: AuthService){

  }
@ViewChild(UserAddComponent)addview: any |UserAddComponent

ngOnInit(): void {

}



}
