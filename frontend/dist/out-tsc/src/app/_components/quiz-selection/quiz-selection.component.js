import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let QuizSelectionComponent = class QuizSelectionComponent {
    constructor(quizService, playService, userService, router) {
        this.quizService = quizService;
        this.playService = playService;
        this.userService = userService;
        this.router = router;
        this.quizList = [];
        this.quizService.quizzes$.subscribe((quizzes) => {
            this.quizList = quizzes;
        });
    }
    ngOnInit() {
        this.quizService.setQuizzesFromUrl();
    }
    selectQuiz(quiz) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (quiz.questions.length > 0) {
                this.playService.setCurrentQuiz(quiz);
                this.playService.createNewGameQuiz();
                this.playService.setGameQuizzesFromUrl();
                this.router.navigate(['/question-view-in-quiz']);
            }
        });
    }
};
QuizSelectionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-quiz-selection',
        templateUrl: './quiz-selection.component.html',
        styleUrls: ['./quiz-selection.component.scss']
    })
], QuizSelectionComponent);
export { QuizSelectionComponent };
//# sourceMappingURL=quiz-selection.component.js.map