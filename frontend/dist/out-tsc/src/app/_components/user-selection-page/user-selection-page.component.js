import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let UserSelectionPageComponent = class UserSelectionPageComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.setUsers();
    }
    ngOnInit() {
    }
    setUsers() {
        this.userService.setUsersFromUrl();
        this.userService.availableUsers$.subscribe((users) => {
            this.availableUsers = users;
            console.log(this.availableUsers);
        });
    }
    onSelectUser(user) {
        this.userService.addUserToLogs(user);
        this.router.navigate(['/acceuil-joueur']);
    }
    onNoUserAvailable() {
        this.router.navigate(['/user-creation-page']);
    }
    deleteUser(user) {
        this.userService.deleteUser(user);
    }
};
UserSelectionPageComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-selection-page',
        templateUrl: './user-selection-page.component.html',
        styleUrls: ['./user-selection-page.component.scss']
    })
], UserSelectionPageComponent);
export { UserSelectionPageComponent };
//# sourceMappingURL=user-selection-page.component.js.map