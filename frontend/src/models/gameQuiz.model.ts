import { Quiz } from './quiz.model';
import { User } from './user.model';

export class QuizGame{

    id: string;
    usersAnswers: number[] = [];

    constructor(public quiz: Quiz, public user: User) {

    }
}