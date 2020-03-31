import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ngOnInit() {
  }

  constructor(private router: Router) {
  }

  private goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
