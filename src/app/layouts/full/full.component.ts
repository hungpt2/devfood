import { Component, OnInit, ElementRef, ViewChild   } from '@angular/core';
import { Router } from '@angular/router';
import { CookieStorage, LocalStorage, SessionStorage } from 'ngx-store';

@Component({
  selector: 'full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent implements OnInit {
  @LocalStorage('outlet') outlet: any = '';
  @ViewChild("cart") MyProp: ElementRef;

  scroll: Boolean;
  openModal: Boolean;
  openConfirm: Boolean;

  constructor(public router: Router) { }

  ngOnInit() {
    this.scroll = false;
    this.openModal = false;
    this.openConfirm = false;
    if (this.outlet === '') {
      this.openModal = true
    }
  }

  countChange(value) {
    this.scroll = !this.scroll
  }

  doOpenModal($event) {
    this.openModal = true
  }

  hideModal($event) {
    this.openModal = false
  }

}
