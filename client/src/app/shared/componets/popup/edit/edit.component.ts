import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { RaspisanieService } from 'src/app/shared/services/raspisanie.service';
import { IGroup } from 'src/app/shared/models/group.model';
import { DeletePopupComponent } from '../delete/delete.component';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditPopupComponent implements OnInit {

  formEdit = this.fb.group({
    groups: [null, [Validators.required]]
  });

  groupsArray: IGroup[];

  constructor(
    @Optional() public dialogRef: MatDialogRef<DeletePopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public group: any,
    private fb: FormBuilder,
    private raspisanieService: RaspisanieService
  ) { }

  ngOnInit() {
    this.raspisanieService.groups.subscribe((groups) => {
      this.groupsArray = groups;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const values = this.formEdit.value;
    this.dialogRef.close(values.groups);

  }
}
