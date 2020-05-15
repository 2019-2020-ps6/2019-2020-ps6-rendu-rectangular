import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionComponent } from './question/question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { AcceuilJoueurComponent } from './acceuil-joueur/acceuil-joueur.component';
import { UserCreationPageComponent } from './user-creation-page/user-creation-page.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { BottomSheetVisualPreferenceComponent, BottomSheetVisualPreferenceSheet } from './bottom-sheet-visual-preference/bottom-sheet-visual-preference.component';
import { QuizSelectionViewComponent } from './quizzes/quiz-selection-view/quiz-selection-view.component';
import { QuestionViewQuizComponent } from './question-view-quiz/question-view-quiz.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSelectionPageComponent } from './user-selection-page/user-selection-page.component';
import { MatSliderModule } from '@angular/material/slider';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material';
import { ScorePageComponent } from './score-page/score-page.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            QuizListComponent,
            QuizComponent,
            HeaderComponent,
            QuizFormComponent,
            EditQuizComponent,
            QuestionFormComponent,
            QuestionComponent,
            QuestionListComponent,
            FourOhFourComponent,
            AcceuilComponent,
            AcceuilJoueurComponent,
            QuizSelectionComponent,
            QuizSelectionViewComponent,
            QuestionViewQuizComponent,
            ResultPageComponent,
            UserSelectionPageComponent,
            BottomSheetVisualPreferenceComponent,
            BottomSheetVisualPreferenceSheet,
            UserCreationPageComponent,
            ScorePageComponent,
            MatSlideToggleModule
        ],
        exports: [
            MatSlideToggleModule
        ],
        imports: [
            BrowserModule,
            ReactiveFormsModule,
            HttpClientModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            MatSliderModule,
            MatNativeDateModule
        ],
        entryComponents: [
            BottomSheetVisualPreferenceComponent,
            BottomSheetVisualPreferenceSheet
        ],
        providers: [{ provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map