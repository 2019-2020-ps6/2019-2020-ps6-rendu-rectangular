import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { PlayService } from 'src/services/play.service';
import { UserService } from 'src/services/user.service';
import { QuizGame } from 'src/models/gameQuiz.model';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent implements OnInit {

  user: User;
  playersQuizGame: QuizGame[];
  scores: number[];

  constructor(private playService: PlayService, private userService: UserService) {
    this.userService.updateUser();
    this.userService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.playService.quizgamesObservable().subscribe((quizGames: QuizGame[]) => {
        console.log('Les quizgames sont', quizGames);
        this.playersQuizGame = quizGames
        .filter((game: QuizGame) => game.user.id === this.user.id)
        .reverse();
        this.scores = this.playersQuizGame.map((quizgame: QuizGame) => this.playService.calculateScoreOfGame(quizgame));
      });
    });
  }

  ngOnInit() {
  }

}