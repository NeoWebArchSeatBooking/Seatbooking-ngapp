import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, content: string},
    public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  close(val: boolean){
    this.dialogRef.close(val);
  }

}
