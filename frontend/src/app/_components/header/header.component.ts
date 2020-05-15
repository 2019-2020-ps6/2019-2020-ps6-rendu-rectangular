import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
