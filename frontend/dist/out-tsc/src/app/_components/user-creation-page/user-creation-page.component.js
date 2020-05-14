import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
let UserCreationPageComponent = class UserCreationPageComponent {
    constructor(formBuilder, userService, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.router = router;
        this.initializeUserForm();
    }
    ngOnInit() {
    }
    initializeUserForm() {
        this.userForm = this.formBuilder.group({
            firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(32)])
        });
    }
    addUser() {
        this.userService.createNewUser(this.userForm.get('firstName').value, this.userForm.get('lastName').value);
        this.router.navigate(['/user-selection-page']);
    }
};
UserCreationPageComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-creation-page',
        templateUrl: './user-creation-page.component.html',
        styleUrls: ['./user-creation-page.component.scss']
    })
], UserCreationPageComponent);
export { UserCreationPageComponent };
//# sourceMappingURL=user-creation-page.component.js.map