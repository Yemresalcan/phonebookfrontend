import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import{MatSort} from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';



@Component({
  selector: 'app-notlogin',
  templateUrl: './notlogin.component.html',
  styleUrls: ['./notlogin.component.css'],
})
export class NotloginComponent implements OnInit {
  users: User[] = [];
  fileName= 'TelefonRehberi.xlsx';
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;

  userEditForm!: FormGroup;
 dataLoaded= false;
 filterText='';


  constructor(private userService:UserService,private toastr: ToastrService) {
    var selected_item = document.getElementById('deneme1')?.ariaRowIndex;
   }

  ngOnInit(): void {

    this.getUsers();

  }
  getUsers(){
    this.userService.getUsers().subscribe(response =>{
      this.users=response.data
      this.dataLoaded=true;

    })
  }

  exportexcel(): void
  {

    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);


    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }













}




