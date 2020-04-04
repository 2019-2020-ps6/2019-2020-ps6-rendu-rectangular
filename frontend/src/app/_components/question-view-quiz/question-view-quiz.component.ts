import { Component, OnInit } from '@angular/core';
import { Question, Answer } from 'src/models/question.model';
import { PlayService } from 'src/services/play.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-view-quiz',
  templateUrl: './question-view-quiz.component.html',
  styleUrls: ['./question-view-quiz.component.scss']
})
export class QuestionViewQuizComponent implements OnInit {

  question: Question;

  constructor(private playService: PlayService, private router: Router) {
    this.playService.currentQuestion$.subscribe((question: Question) => {
      this.question = question;
    });
  }

  ngOnInit() {
  }

  onButtonClick(answer: Answer) {
    /*
    if (answer.isCorrect) {
      console.log('Ajout dun point!!!!');
      this.playService.addAPoint();
    }
    if (this.playService.nextQuestion()) {
      this.router.navigate(['/question-view-in-quiz']);
    } else {
      this.router.navigate(['/result-page']);
    }
  */
  }
}