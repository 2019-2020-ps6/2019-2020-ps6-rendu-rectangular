import { Component, OnInit } from '@angular/core';
import { PlayService } from 'src/services/play.service';
import { User } from 'src/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-selection-page',
  templateUrl: './user-selection-page.component.html',
  styleUrls: ['./user-selection-page.component.scss']
})
export class UserSelectionPageComponent implements OnInit {

  availableUsers: User[];

  constructor(private playService: PlayService) { 
    this.setUsers();
  }

  ngOnInit() {
  }

  setUsers() {
    this.playService.setUsersFromUrl();
    this.playService.availableUsers$.subscribe((users: User[])=> {
      this.availableUsers = users;
      console.log(this.availableUsers);
    });
  }



}
