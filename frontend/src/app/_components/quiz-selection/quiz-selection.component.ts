import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { PlayService } from 'src/services/play.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { UtilService } from 'src/services/util.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent implements OnInit {

  public quizList: Quiz[] = [];
  user: User;

  constructor(private quizService: QuizService,
              private playService: PlayService,
              private router: Router,
              private utilService: UtilService,
              private userService: UserService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.userService.currentUser$.subscribe((user: User) => this.user = user);
  }

  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
  }

  async selectQuiz(quiz: Quiz) {
    if (quiz.questions.length > 0) {
      this.playService.setCurrentQuiz(quiz);
      this.playService.createNewGameQuiz();
      this.playService.setGameQuizzesFromUrl();
      this.router.navigate(['/question-view-in-quiz']);
    }
  }
}

