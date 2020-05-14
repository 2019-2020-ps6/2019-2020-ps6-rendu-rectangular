import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  nbQuestions = 2;

  @Input()
  quiz: Quiz;

  constructor() {}

  ngOnInit() {}

  onDisplayTwoAnswers() {
    this.nbQuestions = 2;
  }

  onDisplayFourAnswers() {
    this.nbQuestions = 4;
  }
}

