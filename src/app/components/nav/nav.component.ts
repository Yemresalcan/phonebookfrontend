import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private toasterService: ToastrService,) { }

  ngOnInit(): void {
  }
alert(){
  this.toasterService.error("Kullanıcı eklemek için giriş yapın ")
}
}
