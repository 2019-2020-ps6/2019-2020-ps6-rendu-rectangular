import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-user-selection-page',
  templateUrl: './user-selection-page.component.html',
  styleUrls: ['./user-selection-page.component.scss']
})
export class UserSelectionPageComponent implements OnInit {

  availableUsers: User[];

  constructor(private userService: UserService, private utilService: UtilService) {
    this.setUsers();
  }

  ngOnInit() {
  }

  setUsers() {
    this.userService.setUsersFromUrl();
    this.userService.availableUsers$.subscribe((users: User[]) => {
      this.availableUsers = users;
    });
  }

  onSelectUser(user: User) {
    this.userService.addUserToLogs(user);
    this.utilService.goToPage('/acceuil-joueur');
  }

  onNoUserAvailable() {
    this.utilService.goToPage('/user-creation-page');
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user);
  }
}
