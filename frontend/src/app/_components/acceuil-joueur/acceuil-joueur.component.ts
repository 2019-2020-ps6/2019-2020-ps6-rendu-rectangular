import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil-joueur',
  templateUrl: './acceuil-joueur.component.html',
  styleUrls: ['./acceuil-joueur.component.scss']
})
export class AcceuilJoueurComponent implements OnInit {
  size = 40;

  ngOnInit() {
  }

  constructor(private router: Router) {
  }

  private goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
