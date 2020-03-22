import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model'

import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  quiz: Quiz;

  constructor(private route: ActivatedRoute, private quizService : QuizService) { 
    this.getQuiz();
  }

  ngOnInit() {
    
  }

  
  getQuiz(): void {
    const id = this.route.snapshot.paramMap.get('id');
      this.quizService.getQuiz(id)
        .subscribe(quiz => {
          this.quiz = quiz;
        });
  }

  questionAdd(selected : Question){ 
    console.log('edit :',selected);
    this.quizService.addQuestion(selected, this.quiz);
  }
  

}
