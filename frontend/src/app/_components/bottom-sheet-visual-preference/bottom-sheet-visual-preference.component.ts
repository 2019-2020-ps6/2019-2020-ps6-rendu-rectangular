import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from 'src/services/user.service';
const MIN_FONT_SIZE = 30;
const MAX_FONT_SIZE = 70;

@Component({
  selector: 'app-bottom-sheet-visual-preference',
  templateUrl: './bottom-sheet-visual-preference.component.html',
  styleUrls: ['./bottom-sheet-visual-preference.component.scss']
})
export class BottomSheetVisualPreferenceComponent implements OnInit {
  flag = 0;

  ngOnInit() {
  }

  constructor(private _bottomSheet: MatBottomSheet) { }

  openBottomSheet(): void {
    if (this.flag === 0) {
      this._bottomSheet.open(BottomSheetVisualPreferenceSheet);
      this.flag = 1;
    } else if (this.flag === 1) {
      this._bottomSheet.dismiss();
      this.flag = 0;
    }
  }

}

@Component({
  selector: 'bottom-sheet-visual-preference-sheet',
  templateUrl: 'bottom-sheet-visual-preference-sheet.html',
})
export class BottomSheetVisualPreferenceSheet {

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetVisualPreferenceSheet>, private userService: UserService) { }

  backQuestion(): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onShrinkSize() {
    if (this.userService.currentUser.fontSizePreference > MIN_FONT_SIZE) {
      this.userService.changeFontSize(-10);
    } else {
      console.log('MIN size reached');
    }
  }

  onEnlargeSize() {
    if (this.userService.currentUser.fontSizePreference < MAX_FONT_SIZE) {
      this.userService.changeFontSize(+10);
    } else {
      console.log('MAX size reached');
    }
  }

  onIncreaseContrast() {
    if (this.userService.currentUser.fontContrastPreference < this.userService.contrast.length - 1) {
      this.userService.changeFontContrast(+1);
    } else {
      console.log('MAX contrast reached');
    }
  }

  onDecreaseContrast() {
    if (this.userService.currentUser.fontContrastPreference > 0) {
      this.userService.changeFontContrast(-1);
    } else {
      console.log('MIN contrast reached');
    }
  }

  flag = 0;
  daltonienMode() {
    if (this.flag === 0) {
      console.log('Mode daltonien TRUE');
      this.flag = 1;
    } else if (this.flag === 1) {
      console.log('Mode daltonien False');
      this.flag = 0;
    }
  }
}


