import { Component } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { OutletFirePath, CategoryFirePath, MenuItemFirePath } from '../../../services/firestore.path';
import { LocalStorage } from 'ngx-store';
import { groupBy, keyBy, merge, mapValues, toArray } from 'lodash';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  @LocalStorage('outlet') outlet: any = '';
  categoryListData: any;
  menuItemListData: any;
  finalListData: any;
  loading: Boolean;
  
  constructor(
    public fireDB: FirestoreService
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    await this.fireDB.colWithIds$(`outlets/${this.outlet.id}/${CategoryFirePath}`).subscribe((categoryData: any) => {
      this.categoryListData = keyBy(categoryData, 'id');
    });
    this.fireDB.colWithIds$(`outlets/${this.outlet.id}/${MenuItemFirePath}`).subscribe((menuItemsData: any) => {
      this.menuItemListData = menuItemsData;
      const categoryWise = groupBy(menuItemsData, 'category');
      this.finalListData = toArray(merge({}, this.categoryListData, mapValues(categoryWise, (value) => ({ value }))));
      console.log(this.finalListData)
      this.loading = false;
      
    });
  }

}
