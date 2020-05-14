import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AcceuilJoueurComponent = class AcceuilJoueurComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.size = 40;
        this.userService.updateUser();
        this.userService.currentUser$.subscribe((user) => {
            this.user = user;
            this.size = user.fontSizePreference;
        });
    }
    ngOnInit() {
    }
    goToPage(pageName) {
        this.router.navigate([`${pageName}`]);
    }
};
AcceuilJoueurComponent = tslib_1.__decorate([
    Component({
        selector: 'app-acceuil-joueur',
        templateUrl: './acceuil-joueur.component.html',
        styleUrls: ['./acceuil-joueur.component.scss']
    })
], AcceuilJoueurComponent);
export { AcceuilJoueurComponent };
//# sourceMappingURL=acceuil-joueur.component.js.map