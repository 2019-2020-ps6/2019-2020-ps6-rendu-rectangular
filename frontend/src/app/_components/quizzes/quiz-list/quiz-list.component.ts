import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../../services/quiz.service';
import { Quiz } from '../../../../models/quiz.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(public quizService: QuizService, private router: Router) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      console.log('Quizzes in quizListComponent are:', this.quizList);
    });
  }

  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }
  /*
  On passe par la quizList pour interagir avec les quiz.
  On remarque que dans le quizList.html, on récupère le quiz à traiter par l'intermédiaire 
  de la balise <app-quiz>. Cela est possible grâce au décorateur @Input() dans QuizComponent.
  */
  quizToDelete(selected: Quiz) {
    console.log('quiz received from child:', selected);
    this.quizService.deleteQuiz(selected);
  }

  editQuiz(quiz: Quiz) {
    console.log('Captured quiz is:',  quiz);
    this.router.navigate(['/edit-quiz/' + quiz.id]);
  }
}
