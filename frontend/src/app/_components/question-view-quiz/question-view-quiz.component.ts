import { Component, OnInit } from '@angular/core';
import { Question, Answer } from 'src/models/question.model';
import { UserService } from 'src/services/user.service';
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
  rgb = [0, 0, 0];
  colorInHex = '#000';
  cheminImage: any;


  constructor(private playService: PlayService, private userService: UserService, private router: Router) {
    this.playService.setGameQuizzesFromUrl();
    this.userService.updateUser();
    this.userService.currentUser$.subscribe((user: User) => {
      this.size = user.fontSizePreference;
      this.rgb = this.userService.contrast[user.fontContrastPreference];
      this.colorInHex = this.userService.convertToHexa(this.rgb[0]);
    });
    this.playService.currentQuestion$.subscribe((question: Question) => {
      this.question = question;
      this.cheminImage = (typeof question === 'undefined' || typeof question.image === 'undefined') ? undefined : question.image;
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
