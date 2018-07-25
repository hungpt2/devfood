import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.services'

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  showConfirm: Boolean
  content: String
  title: String

  constructor(
    public commonService: CommonService
  ) { 
    
  }

  ngOnInit() {
    this.commonService.showConfirmUpdate.subscribe((value) => {
      this.showConfirm = this.commonService.getShowConfirm()
    });
    this.content = 'Are you sure you want to remove this item from cart?'
    this.title = 'Remove Meal'
  }

  doHideModal() {
    this.commonService.hideShowConfirm()
  }

  doConfirm () {
    this.commonService.setValue(true)
  }

}
