import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

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

  @Output()
  changeSize: EventEmitter<number> = new EventEmitter<number>();


  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetVisualPreferenceSheet>) {}

  backQuestion(): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onShrinkSize() {
    this.changeSize.emit(-10);
    console.log('text shrinked');
  }

  onEnlargeSize() {
    this.changeSize.emit(+10);
    console.log('text enlarged');
  }
}
