import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let QuestionListComponent = class QuestionListComponent {
    constructor(quizService) {
        this.quizService = quizService;
    }
    ngOnInit() {
    }
    deleteQuestion(question) {
        this.quizService.deleteQuestion(question, this.quiz);
    }
};
tslib_1.__decorate([
    Input()
], QuestionListComponent.prototype, "quiz", void 0);
tslib_1.__decorate([
    Input()
], QuestionListComponent.prototype, "question", void 0);
QuestionListComponent = tslib_1.__decorate([
    Component({
        selector: 'app-question-list',
        templateUrl: './question-list.component.html',
        styleUrls: ['./question-list.component.scss']
    })
], QuestionListComponent);
export { QuestionListComponent };
//# sourceMappingURL=question-list.component.js.map