import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { PlayService } from 'src/services/play.service';
import { QuizGame } from 'src/models/gameQuiz.model';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent implements OnInit {

  user: User;
  playersQuizGame: QuizGame[];

  constructor(private playService: PlayService) { 
    this.playService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.playService.quizgamesObservable().subscribe((quizGames: QuizGame[]) => {
        this.playersQuizGame = quizGames.filter((game: QuizGame) => game.user.id === this.user.id);
        console.log('players quiz games are', this.playersQuizGame);
      });
    });
  }

  ngOnInit() {
  }

}
