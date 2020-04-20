import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-creation-page',
  templateUrl: './user-creation-page.component.html',
  styleUrls: ['./user-creation-page.component.scss']
})
export class UserCreationPageComponent implements OnInit {

  public userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.initializeUserForm();
  }

  ngOnInit() {
  }

  private initializeUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  addUser() {
    this.userService.createNewUser(this.userForm.get('firstName').value, this.userForm.get('lastName').value);
    this.router.navigate(['/user-selection-page']);
  }

}
