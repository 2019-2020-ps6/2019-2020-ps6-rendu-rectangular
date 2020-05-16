import { Component, OnInit } from '@angular/core';
import { PlayService } from 'src/services/play.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  pourcentageReponsesJustes: number;

  constructor(private playService: PlayService, private utilService: UtilService) {
    this.pourcentageReponsesJustes = this.playService.calculateScore();
  }

  ngOnInit() {
  }

}
