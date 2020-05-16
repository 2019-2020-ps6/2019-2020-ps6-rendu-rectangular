import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../../services/quiz.service';
import { Quiz } from '../../../../models/quiz.model';
import { Router } from '@angular/router';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(public quizService: QuizService, 
    private utilService: UtilService
    ){
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
  }

  /*
  On passe par la quizList pour interagir avec les quiz.
  On remarque que dans le quizList.html, on récupère le quiz à traiter par l'intermédiaire
  de la balise <app-quiz>. Cela est possible grâce au décorateur @Input() dans QuizComponent.
  */
  quizToDelete(selected: Quiz) {
    this.quizService.deleteQuiz(selected);
  }

  editQuiz(quiz: Quiz) {
    this.utilService.goToPage('/edit-quiz/' + quiz.id);
  }

}
