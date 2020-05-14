import { async, TestBed } from '@angular/core/testing';
import { QuestionViewQuizComponent } from './question-view-quiz.component';
describe('QuestionViewQuizComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuestionViewQuizComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionViewQuizComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=question-view-quiz.component.spec.js.map