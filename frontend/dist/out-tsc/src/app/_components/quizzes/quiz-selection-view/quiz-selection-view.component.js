import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let QuizSelectionViewComponent = class QuizSelectionViewComponent {
    constructor() {
        this.quizSelected = new EventEmitter();
    }
    ngOnInit() {
    }
    selectQuiz() {
        this.quizSelected.emit(this.quiz);
    }
};
tslib_1.__decorate([
    Input()
], QuizSelectionViewComponent.prototype, "quiz", void 0);
tslib_1.__decorate([
    Output()
], QuizSelectionViewComponent.prototype, "quizSelected", void 0);
QuizSelectionViewComponent = tslib_1.__decorate([
    Component({
        selector: 'app-quiz-selection-view',
        templateUrl: './quiz-selection-view.component.html',
        styleUrls: ['./quiz-selection-view.component.scss']
    })
], QuizSelectionViewComponent);
export { QuizSelectionViewComponent };
//# sourceMappingURL=quiz-selection-view.component.js.map