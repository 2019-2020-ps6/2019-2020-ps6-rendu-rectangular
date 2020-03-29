import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSelectionViewComponent } from './quiz-selection-view.component';

describe('QuizSelectionViewComponent', () => {
  let component: QuizSelectionViewComponent;
  let fixture: ComponentFixture<QuizSelectionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSelectionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSelectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
