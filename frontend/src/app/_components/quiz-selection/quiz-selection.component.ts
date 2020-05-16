import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { PlayService } from 'src/services/play.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(private quizService: QuizService, 
    private playService: PlayService,
    private router: Router,
    private utilService: UtilService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
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

