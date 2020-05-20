import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { PlayService } from 'src/services/play.service';
import { UserService } from 'src/services/user.service';
import { QuizGame } from 'src/models/gameQuiz.model';
import { UtilService } from 'src/services/util.service';
import { QuizService } from 'src/services/quiz.service';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent implements OnInit {

  user: User;
  playersQuizGame: QuizGame[];
  scores: Array<Array<number>>;
  niveau: string = "all";
  themesStr: string[];
  themeSelected: string = "all";

  constructor(private playService: PlayService,
              private userService: UserService,
              private utilService: UtilService,
              private quizService: QuizService
    ) {
    this.userService.updateUser();
    this.userService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.playService.quizgamesObservable().subscribe((quizGames: QuizGame[]) => {
        this.playersQuizGame = quizGames
        .filter((game: QuizGame) => game.user.id === this.user.id)
        .reverse();
        this.scores = this.playersQuizGame.map((quizgame: QuizGame) => this.playService.calculateScoreOfGame(quizgame));
      });
    });
    this.quizService.setThemesFromUrl();
    this.quizService.themes$.subscribe((themes: Theme[]) => {
      this.themesStr = themes.map((theme: Theme) => theme.theme);
    });
  }

  ngOnInit() {
  }

}
