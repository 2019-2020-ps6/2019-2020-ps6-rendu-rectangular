import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ScorePageComponent = class ScorePageComponent {
    constructor(playService, userService) {
        this.playService = playService;
        this.userService = userService;
        this.userService.updateUser();
        this.userService.currentUser$.subscribe((user) => {
            this.user = user;
            this.playService.quizgamesObservable().subscribe((quizGames) => {
                console.log('Les quizgames sont', quizGames);
                this.playersQuizGame = quizGames
                    .filter((game) => game.user.id === this.user.id)
                    .reverse();
                this.scores = this.playersQuizGame.map((quizgame) => this.playService.calculateScoreOfGame(quizgame));
            });
        });
    }
    ngOnInit() {
    }
};
ScorePageComponent = tslib_1.__decorate([
    Component({
        selector: 'app-score-page',
        templateUrl: './score-page.component.html',
        styleUrls: ['./score-page.component.scss']
    })
], ScorePageComponent);
export { ScorePageComponent };
//# sourceMappingURL=score-page.component.js.map