import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { UserService } from 'src/services/user.service';
const MIN_FONT_SIZE = 50;
const MAX_FONT_SIZE = 100;

@Component({
  selector: 'app-bottom-sheet-visual-preference',
  templateUrl: './bottom-sheet-visual-preference.component.html',
  styleUrls: ['./bottom-sheet-visual-preference.component.scss']
})
export class BottomSheetVisualPreferenceComponent implements OnInit {
  ngOnInit() {
  }

  constructor(private _bottomSheet: MatBottomSheet) { }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetVisualPreferenceSheet);
  }

}

@Component({
  selector: 'bottom-sheet-visual-preference-sheet',
  templateUrl: 'bottom-sheet-visual-preference-sheet.html',
})
export class BottomSheetVisualPreferenceSheet {

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetVisualPreferenceSheet>, private userService: UserService) {}

  backQuestion(): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onShrinkSize() {
    if (this.userService.currentUser.fontSizePreference > MIN_FONT_SIZE) {
      this.userService.changeFontSize(-10);
    } else {
      console.log("MIN size reached");
    }
  }

  onEnlargeSize() {
    if (this.userService.currentUser.fontSizePreference < MAX_FONT_SIZE) {
      this.userService.changeFontSize(+10);
    } else {
      console.log('MAX size reached');
    }
  }
}
