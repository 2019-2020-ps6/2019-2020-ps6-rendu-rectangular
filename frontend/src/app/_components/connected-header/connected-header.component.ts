import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-connected-header',
  templateUrl: './connected-header.component.html',
  styleUrls: ['./connected-header.component.scss']
})
export class ConnectedHeaderComponent implements OnInit {
  size = 40;

  colorHeader = '#3f51b5';
  ngOnInit() {
  }

  constructor(private router: Router, private userService: UserService) {
    this.userService.updateUser();
    this.userService.currentUser$.subscribe((user: User) => {
      if (user.isDaltonian) {
        this.colorHeader = 'gray';
      } else {
        this.colorHeader = '#3f51b5';
      }
    });
  }

  private goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
