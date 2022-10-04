import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  users: any;
  currentRole: string | undefined;
  closeResult = '';

  userAddForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private modalService: NgbModal,
    private toasterService: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.empform = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      privateCode: ['', Validators.required],
    });
  }

  add() {
    if (this.empform.valid) {
      let user = this.empform.value as User;
      this.userService.add(user).subscribe((data) => {
        this.toasterService.success('Kaydedildi');
      });
      console.log(this.empform.value);
    } else {
      this.toasterService.error('Kişi kayıt edilmedi');
    }
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
