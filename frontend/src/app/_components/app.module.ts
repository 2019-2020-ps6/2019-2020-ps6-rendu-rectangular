import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { ConnexionPageComponent } from './connexion-page/connexion-page.component';

import { FourOhFourComponent } from './four-oh-four/four-oh-four.component'; 
import { QuizSelectionViewComponent } from './quizzes/quiz-selection-view/quiz-selection-view.component';
import { QuestionViewQuizComponent } from './question-view-quiz/question-view-quiz.component';
import { ResultPageComponent } from './result-page/result-page.component';

@NgModule({
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
    ConnexionPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
