import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let EditQuizComponent = class EditQuizComponent {
    constructor(route, quizService) {
        this.route = route;
        this.quizService = quizService;
        this.quizService.selectedQuiz$.subscribe((quiz) => this.quiz = quiz);
    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.quizService.setSelectedQuiz(id);
    }
};
EditQuizComponent = tslib_1.__decorate([
    Component({
        selector: 'app-edit-quiz',
        templateUrl: './edit-quiz.component.html',
        styleUrls: ['./edit-quiz.component.scss']
    })
], EditQuizComponent);
export { EditQuizComponent };
//# sourceMappingURL=edit-quiz.component.js.map