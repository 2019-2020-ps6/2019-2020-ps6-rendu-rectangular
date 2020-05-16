import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedHeaderComponent } from './connected-header.component';

describe('ConnectedHeaderComponent', () => {
  let component: ConnectedHeaderComponent;
  let fixture: ComponentFixture<ConnectedHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
