import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/services/user.service';
import { TableComponentsComponent } from '../table-components/table-components.component';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  users: any;
  id:any;
  userEditForm!: FormGroup;
  closeResult = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) {}
  @ViewChild(TableComponentsComponent)  addview! :TableComponentsComponent

  ngOnInit(): void {

    this.route.paramMap.subscribe((param) => {
      let x: any=param.get('id');
      this.id= parseInt(x);
      if (x) {
        this.getById(x!);
      }
    });
    this.userService.Refresh.subscribe(result=>{
      this.getUsers();
    })

  }
  upForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    company: new FormControl(),
    phone: new FormControl(),
    department: new FormControl(),
    privateCode: new FormControl(),
  });
  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
    });
  }
  getById(id: string) {
    this.userService.getbyid(id).subscribe((r) => {
      let userObj = r['data'];

      this.upForm.patchValue(userObj);
    });
  }
  update() {
    this.addview.update()
    if (this.upForm) {
      let user = this.upForm.value as User;
      user.id = this.id;
      console.log(user.id);

      console.log(user);
      this.userService.update(user).subscribe((data) => {
        console.log(data);
        this.toasterService.success('kayıt edildi');
      });
    } else {
      this.toasterService.error('Kişi kayıt edilmedi');
    }

  }


  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
        },
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
}
