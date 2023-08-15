import { Component, OnInit } from '@angular/core';

import { AlertService } from '../alert.service';

@Component({
  selector: 'app-multi-alerts',
  templateUrl: './multi-alerts.component.html',
  styleUrls: ['./multi-alerts.component.css']
})

export class MultiAlertsComponent implements OnInit {

  constructor(public alertService: AlertService) { }

  ngOnInit(): void {
  }

}
