import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AcceuilComponent = class AcceuilComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    goToPage(pageName) {
        this.router.navigate([`${pageName}`]);
    }
};
AcceuilComponent = tslib_1.__decorate([
    Component({
        selector: 'app-acceuil',
        templateUrl: './acceuil.component.html',
        styleUrls: ['./acceuil.component.scss']
    })
], AcceuilComponent);
export { AcceuilComponent };
//# sourceMappingURL=acceuil.component.js.map