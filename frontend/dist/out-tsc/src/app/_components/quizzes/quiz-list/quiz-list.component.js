import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let QuizListComponent = class QuizListComponent {
    constructor(quizService, router) {
        this.quizService = quizService;
        this.router = router;
        this.quizList = [];
        this.quizService.quizzes$.subscribe((quizzes) => {
            this.quizList = quizzes;
        });
    }
    ngOnInit() {
        this.quizService.setQuizzesFromUrl();
    }
    quizSelected(selected) {
        console.log('event received from child:', selected);
    }
    /*
    On passe par la quizList pour interagir avec les quiz.
    On remarque que dans le quizList.html, on récupère le quiz à traiter par l'intermédiaire
    de la balise <app-quiz>. Cela est possible grâce au décorateur @Input() dans QuizComponent.
    */
    quizToDelete(selected) {
        this.quizService.deleteQuiz(selected);
    }
    editQuiz(quiz) {
        console.log('Captured quiz is:', quiz);
        this.router.navigate(['/edit-quiz/' + quiz.id]);
    }
};
QuizListComponent = tslib_1.__decorate([
    Component({
        selector: 'app-quiz-list',
        templateUrl: './quiz-list.component.html',
        styleUrls: ['./quiz-list.component.scss']
    })
], QuizListComponent);
export { QuizListComponent };
//# sourceMappingURL=quiz-list.component.js.map