import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/models/quiz.model'

@Component({
  selector: 'app-quiz-selection-view',
  templateUrl: './quiz-selection-view.component.html',
  styleUrls: ['./quiz-selection-view.component.scss']
})
export class QuizSelectionViewComponent implements OnInit {

  @Input()
  quiz: Quiz;

  constructor() { }

  ngOnInit() {
  }

}
