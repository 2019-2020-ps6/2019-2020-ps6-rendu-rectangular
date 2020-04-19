import { Component, OnInit } from '@angular/core';
import { Question, Answer } from 'src/models/question.model';
import { PlayService } from 'src/services/play.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-question-view-quiz',
  templateUrl: './question-view-quiz.component.html',
  styleUrls: ['./question-view-quiz.component.scss']
})
export class QuestionViewQuizComponent implements OnInit {

  question: Question;
  size = 40;

  constructor(private playService: PlayService, private router: Router) {
    this.playService.setGameQuizzesFromUrl();
    this.playService.currentQuestion$.subscribe((question: Question) => {
      this.question = question;
    });
    this.playService.currentUser$$.subscribe((user: User) => {
        this.size = user.fontSizePreference;
    });
  }

  ngOnInit() {
  }

  onButtonClick(usersChoice: number) {

    this.playService.updateUsersAnswers(usersChoice);
    if (this.playService.nextQuestion()) {
      this.router.navigate(['/question-view-in-quiz']);
    } else {
      this.router.navigate(['/result-page']);
    }

  }
}
