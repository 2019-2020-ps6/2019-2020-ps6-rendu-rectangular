import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

}
