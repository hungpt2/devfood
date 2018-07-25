import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { MainComponent } from './main/main.component';
import { TemplateComponent } from './template/template.component';
import { WaveModule } from '../../shared/wave/wave.module';
import { CommonService } from '../../services/common.services';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    WaveModule,
    CommonModule,
    RouterModule.forChild(HomeRoutes),
  ],
  declarations: [
    MainComponent,
    TemplateComponent
  ],
  providers: [
    CommonService,
  ]
})
export class HomeModule { }
