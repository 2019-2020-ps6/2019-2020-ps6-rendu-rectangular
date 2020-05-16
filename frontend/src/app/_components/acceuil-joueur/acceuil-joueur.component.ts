import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-acceuil-joueur',
  templateUrl: './acceuil-joueur.component.html',
  styleUrls: ['./acceuil-joueur.component.scss']
})
export class AcceuilJoueurComponent implements OnInit {
  size = 40;
  user: User;
  colorInHex = '#000';
  rgb = [0, 0, 0];
  colorHeader = '#3f51b5';

  ngOnInit() {
  }

  constructor(private userService: UserService, private router: Router, private utilService: UtilService) {
    this.userService.updateUser();
    this.userService.currentUser$.subscribe((user: User) => {
        this.user = user;
        this.size = user.fontSizePreference;
        this.rgb = this.userService.contrast[user.fontContrastPreference];
        this.colorInHex = this.userService.convertToHexa(this.rgb[0]);
        if (user.isDaltonian) {
          this.colorHeader = 'gray';
        } else {
          this.colorHeader = '#3f51b5';
        }
    });
  }

}
