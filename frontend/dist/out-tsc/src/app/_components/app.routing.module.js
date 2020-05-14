import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { QuestionViewQuizComponent } from './question-view-quiz/question-view-quiz.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { AcceuilJoueurComponent } from './acceuil-joueur/acceuil-joueur.component';
import { UserSelectionPageComponent } from './user-selection-page/user-selection-page.component';
import { UserCreationPageComponent } from './user-creation-page/user-creation-page.component';
import { ScorePageComponent } from './score-page/score-page.component';
const routes = [
    { path: 'quiz-list', component: QuizListComponent },
    { path: 'edit-quiz/:id', component: EditQuizComponent },
    { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
    { path: 'acceuil', component: AcceuilComponent },
    { path: 'acceuil-joueur', component: AcceuilJoueurComponent },
    { path: 'quiz-selection', component: QuizSelectionComponent },
    { path: 'question-view-in-quiz', component: QuestionViewQuizComponent },
    { path: 'result-page', component: ResultPageComponent },
    { path: 'user-selection-page', component: UserSelectionPageComponent },
    { path: 'user-creation-page', component: UserCreationPageComponent },
    { path: 'score-page', component: ScorePageComponent },
    { path: 'not-found', component: FourOhFourComponent },
    { path: '**', redirectTo: 'not-found' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app.routing.module.js.map