import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { OutletFirePath } from '../../../services/firestore.path';
import { ToastrService } from 'ngx-toastr';
import { CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService } from 'ngx-store';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @LocalStorage('outlet') outlet: any = '';
  @Input() show: Boolean;
  @Output() hideModal = new EventEmitter();

  selectedOutlet: any;
  outletList: any;
  loading: Boolean;

  constructor(
    public toastr: ToastrService, 
    private localStorageService: LocalStorageService,
    public fireDB: FirestoreService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.selectedOutlet = [];
    this.fireDB.colWithIds$(OutletFirePath).subscribe((outletList: any) => {
      this.outletList = outletList;
      for (let index = 0; index < outletList.length; index++) {
        if (outletList[index].id === this.outlet.id) {
          this.selectedOutlet.push(true);
        } else {
          this.selectedOutlet.push(false);
        }
      }
      this.loading = false;
    });
  }

  doHideModal() {
    this.hideModal.emit(false)
  }

  chooseOutlet() {
    for (let index = 0; index < this.selectedOutlet.length; index++) {
      const element = this.selectedOutlet[index];
      if (element) {
        this.localStorageService.set('outlet', this.outletList[index]);
        this.doHideModal();
        return;
      }
    }
  }

}
 