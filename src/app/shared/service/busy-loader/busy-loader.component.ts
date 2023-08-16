import { Component, OnInit } from '@angular/core';
import { LoaderService } from './api/loader.service';

@Component({
  selector: 'app-busy-loader',
  templateUrl: './busy-loader.component.html',
  styleUrls: ['./busy-loader.component.css']
})
export class BusyLoaderComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    console.log('hoooo')
  }

  isLoaderBusy() {
    return this.loaderService.isLoaderBusy();
  }

}
