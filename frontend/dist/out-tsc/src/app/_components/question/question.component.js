import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let QuestionComponent = class QuestionComponent {
    constructor() {
        this.questionDelete = new EventEmitter();
    }
    ngOnInit() {
    }
    deleteQuestion() {
        this.questionDelete.emit(this.question);
    }
};
tslib_1.__decorate([
    Input()
], QuestionComponent.prototype, "question", void 0);
tslib_1.__decorate([
    Output()
], QuestionComponent.prototype, "questionDelete", void 0);
QuestionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-question',
        templateUrl: './question.component.html',
        styleUrls: ['./question.component.scss']
    })
], QuestionComponent);
export { QuestionComponent };
//# sourceMappingURL=question.component.js.map