import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectionPageComponent } from './user-selection-page.component';

describe('UserSelectionPageComponent', () => {
  let component: UserSelectionPageComponent;
  let fixture: ComponentFixture<UserSelectionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSelectionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
