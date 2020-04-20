import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { PlayService } from 'src/services/play.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(private quizService: QuizService, private playService: PlayService, private userService: UserService, private router: Router) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
  }

  async selectQuiz(quiz: Quiz) {
    this.playService.setCurrentQuiz(quiz);
    this.playService.setGameQuizzesFromUrl();
    //await this.userService.setLastUserFromLogs();
    this.playService.createNewGameQuiz();
    this.router.navigate(['/question-view-in-quiz']);
  }

}

