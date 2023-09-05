import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { PreferenceService } from 'src/app/services/preference.service';
import { UtilityService } from 'src/app/shared/service/utility/utility.service';

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
    private utilityService: UtilityService
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
        name: loc.locationName,
        type: "LOCATION"
      });
      if (loc.blocks) {
        loc.blocks.forEach((block: any) => {
          this.infraInformation.blocks.push({
            id: `${loc.locationId}_${block.blockId}`,
            name: `${loc.locationName}_${block.blockName}`,
            type: "BLOCK"
          });
          block.floors.forEach((floor:any) => {
            this.infraInformation.floors.push({
              id: `${loc.locationId}_${block.blockId}_${floor.floorId}`,
              name: `${loc.locationName}_${block.blockName}_${floor.floorId}`,
              type: "FLOOR"
            });
          });
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave() {
    console.log(this.preference);
    this.preferenceService.addPreference(this.preference).subscribe(res => {
      this.utilityService.showSuccessAlert('Preference added successfully');
      this.dialogRef.close();
    });
  }
}
