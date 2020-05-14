import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ResultPageComponent = class ResultPageComponent {
    constructor(playService, router) {
        this.playService = playService;
        this.router = router;
        this.pourcentageReponsesJustes = this.playService.calculateScore();
    }
    ngOnInit() {
    }
    onButtonClick() {
        this.router.navigate(['/quiz-selection']);
    }
};
ResultPageComponent = tslib_1.__decorate([
    Component({
        selector: 'app-result-page',
        templateUrl: './result-page.component.html',
        styleUrls: ['./result-page.component.scss']
    })
], ResultPageComponent);
export { ResultPageComponent };
//# sourceMappingURL=result-page.component.js.map