import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[]; // = QUIZ_LIST;
  private url = 'https://api.myjson.com/bins/13ajhy';

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  constructor(public http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
    this.quizzes$.next(this.quizzes);
  }
  /*
  Ici, on récupère les quiz depuis l'url. On recupère un objet de la forme {Quiz[]} (appelé ici quizzesObj) et non Quiz[]
  */
  setQuizzesFromUrl() {
    this.http.get<{quizzes: Quiz[]}>(this.url).subscribe((quizzesObj: {quizzes: Quiz[]}) => {
      this.quizzes = quizzesObj.quizzes;
      this.quizzes$.next(this.quizzes);
    });
  }

  getQuiz(id: string): Observable <Quiz> {
    return this.quizzes$.asObservable().pipe(
      map((quizzes) => quizzes.find((quiz) => quiz.id === id))
    );
  }

  getNumberOfQuizzes(): number {
    return this.quizzes.length;
  }
}
