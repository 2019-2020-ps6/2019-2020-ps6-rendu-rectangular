import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import { UtilService } from 'src/services/util.service';

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

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.userService.updateUser();
    this.userService.currentUser$.subscribe((user: User) => {
      if (user.isDaltonian) {
        this.colorHeader = 'gray';
      } else {
        this.colorHeader = '#3f51b5';
      }
    });

    
  }

  openDialogLogout() {
    const dialogRef = this.dialog.open(LogoutPopup);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogAccueil() {
    const dialogRef = this.dialog.open(BackToAccueil);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

}

@Component({
  selector: 'logout-popup',
  templateUrl: 'logout-popup.html',
})
export class LogoutPopup {

  constructor(private userService: UserService, public dialog: MatDialog, private utilService: UtilService) {}
  
}

@Component({
  selector: 'BackToAccueil',
  templateUrl: 'BackToAccueil.html',
})
export class BackToAccueil {

  constructor(private userService: UserService, public dialog: MatDialog, private utilService: UtilService) {}
  
}
