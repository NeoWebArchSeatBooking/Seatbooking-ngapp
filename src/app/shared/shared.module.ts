import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from './components/shared-components.module';
import { BusyLoaderComponent } from './service/busy-loader/busy-loader.component';
import { AlertModule } from './service/alert';



@NgModule({
  declarations: [
    BusyLoaderComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    AlertModule
  ],
  exports:[
    SharedComponentsModule,
    BusyLoaderComponent,
    AlertModule
  ]
})
export class SharedModule { }
