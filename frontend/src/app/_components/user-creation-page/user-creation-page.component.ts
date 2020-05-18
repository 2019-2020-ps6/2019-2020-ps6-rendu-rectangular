import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { UtilService } from 'src/services/util.service';




@Component({
  selector: 'app-user-creation-page',
  templateUrl: './user-creation-page.component.html',
  styleUrls: ['./user-creation-page.component.scss']
})
export class UserCreationPageComponent implements OnInit {

  public userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private userService: UserService, private utilService: UtilService) {
    this.initializeUserForm();
  }

  ngOnInit() {
  }

  private initializeUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]),
      valueCheched: [false]
    });
  }

  addUser() {
    this.userService.createNewUser(this.userForm.get('firstName').value, this.userForm.get('lastName').value, this.userForm.get('valueCheched').value);
    this.utilService.goToPage('/user-selection-page');
  }

}
