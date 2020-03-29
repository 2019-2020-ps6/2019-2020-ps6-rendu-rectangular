import { Component, OnInit } from '@angular/core';
import { PlayService } from 'src/services/play.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  nbOfCorrectAnswers: number;
  nbOfQuestions: number;
  pourcentageReponsesJustes: number;

  constructor(private playService: PlayService, private router: Router) { 
    this.nbOfQuestions = this.playService.questionList.length;
    this.nbOfCorrectAnswers = this.playService.nbCorrectAnswers;
    this.pourcentageReponsesJustes = (this.nbOfCorrectAnswers/this.nbOfQuestions)*100;
  }

  ngOnInit() {
  }

  onButtonClick() {
    this.router.navigate(['/quiz-selection']);
    this.playService.clear();
  }

}
