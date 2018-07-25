import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CommonService {
  showConfirmUpdate: EventEmitter<any> = new EventEmitter();
  showConfirm: Boolean;
  value: Boolean;

  constructor(
  ) {
    this.showConfirm = false
    this.value = false
  }

  openShowConfirm() {
    this.showConfirm = true
    this.value = false
    this.showConfirmUpdate.emit(this.showConfirm)
  }

  hideShowConfirm() {
    this.showConfirm = false
    this.showConfirmUpdate.emit(this.showConfirm)
  }
  
  getShowConfirm() {
    return this.showConfirm
  }

  setValue(value) {
    this.value = value
    this.hideShowConfirm()
  }

  getValue() {
    return this.value
  }
}