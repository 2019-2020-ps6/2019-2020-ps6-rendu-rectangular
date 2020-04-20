import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-acceuil-joueur',
  templateUrl: './acceuil-joueur.component.html',
  styleUrls: ['./acceuil-joueur.component.scss']
})
export class AcceuilJoueurComponent implements OnInit {
  size = 40;
  user: User;

  ngOnInit() {
  }

  constructor(private userService: UserService, private router: Router) {
    this.userService.updateUser();
    this.userService.currentUser$.subscribe((user: User) => {
        this.user = user;
        this.size = user.fontSizePreference;
    });
  }

  private goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
