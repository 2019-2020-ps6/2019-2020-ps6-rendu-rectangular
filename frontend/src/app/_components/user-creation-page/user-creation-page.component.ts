import { Component, OnInit } from '@angular/core';
import { PlayService } from 'src/services/play.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';


@Component({
  selector: 'app-user-creation-page',
  templateUrl: './user-creation-page.component.html',
  styleUrls: ['./user-creation-page.component.scss']
})
export class UserCreationPageComponent implements OnInit {

  public userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private playService: PlayService) { 
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
    this.playService.createNewUser(this.userForm.get('firstName').value, this.userForm.get('lastName').value);
    this.initializeUserForm();
  }

}
