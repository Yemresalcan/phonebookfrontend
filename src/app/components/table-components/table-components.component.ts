import { Component, OnInit, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-components',
  templateUrl: './table-components.component.html',
  styleUrls: ['./table-components.component.css'],
})
export class TableComponentsComponent implements OnInit {
  users: User[] = [];
  fileName = 'TelefonRehberi.xlsx';
  userEditForm!: FormGroup;
  dataLoaded = false;
  filterText = '';
  user: any;
  id: any;
  closeResult = '';
  config: any;
  collection = { count: 60, data: [] };


  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toasterService: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userService.Refresh.subscribe((result) => {
      this.getUsers();
    });
    this.empform = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['',Validators.required],
      department: ['', Validators.required],
      privateCode: ['', Validators.required],
    });
    this.getUsers();
  }

  submit(){
    console.log(this.empform.value);
  }
  get m(){
    return this.empform.controls;
  }

  add() {
    console.log(this.id);

    if (!this.id) {
      if (this.empform.valid) {
        let user = this.empform.value as User;
        this.userService.add(user).subscribe((data) => {
          this.toasterService.success('Kaydedildi');
        });
        console.log(this.empform.value);
      } else {
        this.toasterService.error(
          ' Kayıt Edilmedi , Lütfen girişlerinizi kontrol ediniz'
        );
      }
    } else {

      if (this.empform.valid) {
        let user = this.empform.value as User;
        user.id = this.id;
        console.log(user);

        // console.log(user);
        this.userService.update(user).subscribe((data) => {
          console.log(data);
          this.toasterService.success('kayıt edildi');
        });
      } else {
        this.toasterService.error('Kişi kayıt edilmedi');
      }
    }
    this.userService.Refresh.subscribe((result) => {
      this.getUsers();
    });
  }

  cancel() {
    this.location.back();
  }

  empform = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    company: new FormControl(),
    phone: new FormControl(),
    department: new FormControl(),
    privateCode: new FormControl(),
  });

  open(con: any, id: any) {
    id != 0
      ? this.userService.getbyid(id).subscribe((r) => {
          let userObj = r['data'];
          this.id = userObj.id;
          this.empform.patchValue(userObj);
          console.log(userObj);
        })
      : '';
    this.clearForm();

    this.modalService

      .open(con, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
      this.dataLoaded = true;
    });

  }

  updateUser(user: User) {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
      this.dataLoaded = true;
    });
  }
  exportexcel(): void {
    let element = document.getElementById('id');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Shee');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  clearForm() {
    this.empform.setValue({
      name: '',
      surname: '',
      company: '',
      phone: '',
      department: '',
      privateCode: '',
    });
  }


  //UPDATE FORM ///

  upForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    company: new FormControl(),
    phone: new FormControl(),
    department: new FormControl(),
    privateCode: new FormControl(),
  });

  getById(id: string) {
    this.userService.getbyid(id).subscribe((r) => {
      let userObj = r['data'];

      this.upForm.patchValue(userObj);
      this.id = userObj.id;
      console.log(this.upForm);
    });
  }

  update() {
    if (this.upForm) {
      let user = this.upForm.value as User;
      user.id = this.id;
      console.log(user.id);

      console.log(user);
      this.userService.update(user).subscribe((data) => {
        console.log(data);
        this.toasterService.success('Kişi Güncellendi');
      });
    } else {
      this.toasterService.error('Kişi Güncellenmedi');
    }

  }

  delUsers(user: User) {

    Swal.fire({
      title: 'Silmek istediğinizden emin misiniz ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet.',
      cancelButtonText: 'Hayır',
    })

    .then((result) => {
      if (result.value) {
        this.userService.delete(user.id).subscribe((response) => {
          Swal.fire('Silindi!', 'Kullanıcı Başarıyla silindi.', 'success');
          this.getUsers();
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('İptai edildi', '', 'error');
      }

    });
  }

  }



