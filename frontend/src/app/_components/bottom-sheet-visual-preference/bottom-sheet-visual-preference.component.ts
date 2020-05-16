import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { MatSlideToggleChange } from '@angular/material';
const MIN_FONT_SIZE = 30;
const MAX_FONT_SIZE = 80;

@Component({
  selector: 'app-bottom-sheet-visual-preference',
  templateUrl: './bottom-sheet-visual-preference.component.html',
  styleUrls: ['./bottom-sheet-visual-preference.component.scss']
})
export class BottomSheetVisualPreferenceComponent implements OnInit {
  flag = 0;
  size = 40;
  colorButton = 'rgb(176, 241, 176)';
  colorBorder = 'rgb(0, 0, 0)';

  ngOnInit() {
  }

  constructor(private _bottomSheet: MatBottomSheet, private userService: UserService) {
    this.userService.updateUser();
    this.userService.currentUser$.subscribe((user: User) => {
      if (user.isDaltonian) {
        this.colorButton = 'rgb(128, 128, 128)';
        this.colorBorder = 'rgb(32, 32, 32)';
      } else {
        this.colorButton = 'rgb(176, 241, 176)';
        this.colorBorder = 'rgb(0, 0, 0)';
      }
    });
  }

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

  daltonian = false;
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetVisualPreferenceSheet>, private userService: UserService) {
    this.daltonian = userService.currentUser.isDaltonian;
  }


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
  onChange(event: MatSlideToggleChange) {
      this.userService.changeDaltonianMode(event.checked);
  }
}


