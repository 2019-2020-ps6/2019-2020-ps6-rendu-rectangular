import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';

import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private router: Router,
              private utilService: UtilService
    ) {
    this.quizService.selectedQuiz$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }
}
