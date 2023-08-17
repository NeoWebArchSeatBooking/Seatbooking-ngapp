import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from './components/shared-components.module';
import { BusyLoaderComponent } from './service/busy-loader/busy-loader.component';



@NgModule({
  declarations: [
    BusyLoaderComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
  ],
  exports:[
    SharedComponentsModule,
    BusyLoaderComponent
  ]
})
export class SharedModule { }
