import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { floor } from 'lodash';
import { forkJoin } from 'rxjs';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { PreferenceService } from 'src/app/services/preference.service';

@Component({
  selector: 'app-add-preference',
  templateUrl: './add-preference.component.html',
  styleUrls: ['./add-preference.component.scss']
})
export class AddPreferenceComponent implements OnInit {

  infraOptions: any;
  infraInformation: any = {
    infras: [],
    blocks: [],
    floors: []
  };
  preference: any = {};

  constructor(
    public dialogRef: MatDialogRef<AddPreferenceComponent>,
    private preferenceService: PreferenceService,
    private infraService: CompanyInfoService,
  ) { }
  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    forkJoin([
      this.infraService.getInfraOptions(),
      this.infraService.fetchSeatingInformation()
    ]).subscribe((res: any) => {
      this.infraOptions = res[0].items;
      this.proessInfraInformation(res[1].infras);
      console.log(this.infraInformation);
    });

  }

  public onChange(event: any) {
    console.log(event);
    this.preference.key = event.value;
  }

  proessInfraInformation(infras: any) {
    infras.forEach((loc: any) => {
      this.infraInformation.infras.push({
        id: loc.locationId,
        name: loc.locationName
      });
      if (loc.blocks) {
        loc.blocks.forEach((block: any) => {
          this.infraInformation.blocks.push({
            id: `${loc.locationId}_${block.blockId}`,
            name: `${loc.locationName}_${block.blockName}`
          });
          block.floors.forEach((floor:any) => {
            this.infraInformation.floors.push({
              id: `${loc.locationId}_${block.blockId}_${floor.floorId}`,
              name: `${loc.locationName}_${block.blockName}_${floor.floorId}`
            });
          });
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    
  }
}
