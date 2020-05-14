import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let QuestionViewQuizComponent = class QuestionViewQuizComponent {
    constructor(playService, userService, router) {
        this.playService = playService;
        this.userService = userService;
        this.router = router;
        this.size = 40;
        this.rgb = [0, 0, 0];
        this.colorInHex = '#000';
        this.playService.setGameQuizzesFromUrl();
        this.userService.updateUser();
        this.userService.currentUser$.subscribe((user) => {
            this.size = user.fontSizePreference;
            this.rgb = this.userService.contrast[user.fontContrastPreference];
            this.colorInHex = this.userService.convertToHexa(this.rgb[0]);
        });
        this.playService.currentQuestion$.subscribe((question) => {
            this.question = question;
            this.cheminImage = (typeof question === 'undefined' || typeof question.image === 'undefined') ? undefined : question.image;
        });
    }
    ngOnInit() {
    }
    onButtonClick(usersChoice) {
        this.playService.updateUsersAnswers(usersChoice);
        if (this.playService.nextQuestion()) {
            this.router.navigate(['/question-view-in-quiz']);
        }
        else {
            this.router.navigate(['/result-page']);
        }
    }
};
QuestionViewQuizComponent = tslib_1.__decorate([
    Component({
        selector: 'app-question-view-quiz',
        templateUrl: './question-view-quiz.component.html',
        styleUrls: ['./question-view-quiz.component.scss']
    })
], QuestionViewQuizComponent);
export { QuestionViewQuizComponent };
//# sourceMappingURL=question-view-quiz.component.js.map