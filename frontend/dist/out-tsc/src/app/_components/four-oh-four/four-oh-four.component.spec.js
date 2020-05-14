import { async, TestBed } from '@angular/core/testing';
import { FourOhFourComponent } from './four-oh-four.component';
describe('FourOhFourComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FourOhFourComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(FourOhFourComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=four-oh-four.component.spec.js.map