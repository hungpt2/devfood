import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'ngx-store';
import { FirestoreService } from '../../services/firestore.service';
import { CategoryFirePath } from '../../services/firestore.path';

@Component({
  selector: 'ap-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  @LocalStorage('outlet') outlet: any = '';
  
  @Output() scrollCart = new EventEmitter();
  @Output() doOpenModal = new EventEmitter();

  swt: Boolean;
  categoryList: any;
  categorySelected: any;

  constructor(
    public fireDB: FirestoreService
  ) { }

  ngOnInit () {
    this.swt = false;
    this.fireDB.colWithIds$(`outlets/${this.outlet.id}/${CategoryFirePath}`).subscribe((response: any) => {
      this.categoryList = response
      this.categorySelected = this.categoryList[0]
    });
  }

  scroll() {
    this.swt = !this.swt;
    this.scrollCart.emit(this.swt);
  }

  outletModalShow() {
    this.doOpenModal.emit(true)
  }

}
