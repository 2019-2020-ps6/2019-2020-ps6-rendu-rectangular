import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetVisualPreferenceComponent } from './bottom-sheet-visual-preference.component';

describe('BottomSheetVisualPreferenceComponent', () => {
  let component: BottomSheetVisualPreferenceComponent;
  let fixture: ComponentFixture<BottomSheetVisualPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetVisualPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetVisualPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
