import { async, TestBed } from '@angular/core/testing';
import { AcceuilJoueurComponent } from './acceuil-joueur.component';
describe('AcceuilJoueurComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AcceuilJoueurComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AcceuilJoueurComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=acceuil-joueur.component.spec.js.map