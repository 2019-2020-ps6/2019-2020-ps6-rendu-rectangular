import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { PlayService } from 'src/services/play.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { UtilService } from 'src/services/util.service';
import { User } from 'src/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent implements OnInit {

  public quizList: Quiz[] = [];
  user: User;
  niveau: string = "all";
  themesStr: string[];
  themeSelected: string = "all";
  query: string = "";

  constructor(private quizService: QuizService,
              private playService: PlayService,
              private router: Router,
              private utilService: UtilService,
              private userService: UserService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.userService.currentUser$.subscribe((user: User) => this.user = user);
    this.quizService.setThemesFromUrl();
    this.quizService.themes$.subscribe((themes: Theme[]) => {
      this.themesStr = themes.map((theme: Theme) => theme.theme);
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

