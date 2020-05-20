import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import {MatDialog} from '@angular/material/dialog';

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

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog) {
    this.userService.updateUser();
    this.userService.currentUser$.subscribe((user: User) => {
      if (user.isDaltonian) {
        this.colorHeader = 'gray';
      } else {
        this.colorHeader = '#3f51b5';
      }
    });

    
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogoutPopup);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}

@Component({
  selector: 'logout-popup',
  templateUrl: 'logout-popup.html',
})
export class LogoutPopup {

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog) {}
  
  private goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
    this.dialog.closeAll;
  }

  


}
