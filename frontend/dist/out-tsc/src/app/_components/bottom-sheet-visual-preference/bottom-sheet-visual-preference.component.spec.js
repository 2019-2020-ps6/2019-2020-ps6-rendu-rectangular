import { async, TestBed } from '@angular/core/testing';
import { BottomSheetVisualPreferenceComponent } from './bottom-sheet-visual-preference.component';
describe('BottomSheetVisualPreferenceComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BottomSheetVisualPreferenceComponent]
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
//# sourceMappingURL=bottom-sheet-visual-preference.component.spec.js.map