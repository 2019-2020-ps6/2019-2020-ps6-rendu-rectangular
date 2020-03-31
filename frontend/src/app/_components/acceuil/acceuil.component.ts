import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  ngOnInit() {
  }

  constructor(private router: Router) {
  }

  private goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
