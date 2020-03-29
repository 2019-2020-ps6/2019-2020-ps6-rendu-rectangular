import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model'
import { PlayService } from 'src/services/play.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(private quizService: QuizService, private playService: PlayService, private router: Router) { 
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      console.log('Quizzes in selection page are', this.quizList);
    });
  }

  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
  }

  selectQuiz(quiz: Quiz) {
    console.log('Quiz selected is', quiz);
    this.playService.setQuiz(quiz);
    this.router.navigate(['/question-view-in-quiz']);
  }

}
  