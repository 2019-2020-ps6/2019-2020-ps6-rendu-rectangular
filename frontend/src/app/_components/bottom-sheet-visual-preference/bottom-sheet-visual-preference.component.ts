import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { PlayService } from 'src/services/play.service';

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

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetVisualPreferenceSheet>, private playService: PlayService) {}

  backQuestion(): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onShrinkSize() {
    this.playService.changeUsersFontSize(-10);
  }

  onEnlargeSize() {
    this.playService.changeUsersFontSize(+10);
  }
}
