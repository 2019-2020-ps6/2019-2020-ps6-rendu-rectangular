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
  cheminImage:any = "https://images.sudouest.fr/2020/01/21/5e27092366a4bd6733ae5f03/widescreen/1000x500/plus-de-14700-bergers.jpg?v1";


  constructor(private playService: PlayService, private userService: UserService, private router: Router) {
    this.playService.setGameQuizzesFromUrl();
    this.userService.updateUser();
    this.userService.currentUser$.subscribe((user: User) => this.size = user.fontSizePreference);
    this.playService.currentQuestion$.subscribe((question: Question) => {
      this.question = question;
      this.cheminImage = question.image; 
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
