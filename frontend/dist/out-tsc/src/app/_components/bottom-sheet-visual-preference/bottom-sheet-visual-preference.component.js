import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
const MIN_FONT_SIZE = 30;
const MAX_FONT_SIZE = 70;
let BottomSheetVisualPreferenceComponent = class BottomSheetVisualPreferenceComponent {
    constructor(_bottomSheet) {
        this._bottomSheet = _bottomSheet;
        this.flag = 0;
    }
    ngOnInit() {
    }
    openBottomSheet() {
        if (this.flag === 0) {
            this._bottomSheet.open(BottomSheetVisualPreferenceSheet);
            this.flag = 1;
        }
        else if (this.flag === 1) {
            this._bottomSheet.dismiss();
            this.flag = 0;
        }
    }
};
BottomSheetVisualPreferenceComponent = tslib_1.__decorate([
    Component({
        selector: 'app-bottom-sheet-visual-preference',
        templateUrl: './bottom-sheet-visual-preference.component.html',
        styleUrls: ['./bottom-sheet-visual-preference.component.scss']
    })
], BottomSheetVisualPreferenceComponent);
export { BottomSheetVisualPreferenceComponent };
let BottomSheetVisualPreferenceSheet = class BottomSheetVisualPreferenceSheet {
    constructor(_bottomSheetRef, userService) {
        this._bottomSheetRef = _bottomSheetRef;
        this.userService = userService;
    }
    backQuestion() {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
    onShrinkSize() {
        if (this.userService.currentUser.fontSizePreference > MIN_FONT_SIZE) {
            this.userService.changeFontSize(-10);
        }
        else {
            console.log('MIN size reached');
        }
    }
    onEnlargeSize() {
        if (this.userService.currentUser.fontSizePreference < MAX_FONT_SIZE) {
            this.userService.changeFontSize(+10);
        }
        else {
            console.log('MAX size reached');
        }
    }
    onIncreaseContrast() {
        if (this.userService.currentUser.fontContrastPreference < this.userService.contrast.length - 1) {
            this.userService.changeFontContrast(+1);
        }
        else {
            console.log('MAX contrast reached');
        }
    }
    onDecreaseContrast() {
        if (this.userService.currentUser.fontContrastPreference > 0) {
            this.userService.changeFontContrast(-1);
        }
        else {
            console.log('MIN contrast reached');
        }
    }
};
BottomSheetVisualPreferenceSheet = tslib_1.__decorate([
    Component({
        selector: 'bottom-sheet-visual-preference-sheet',
        templateUrl: 'bottom-sheet-visual-preference-sheet.html',
    })
], BottomSheetVisualPreferenceSheet);
export { BottomSheetVisualPreferenceSheet };
//# sourceMappingURL=bottom-sheet-visual-preference.component.js.map