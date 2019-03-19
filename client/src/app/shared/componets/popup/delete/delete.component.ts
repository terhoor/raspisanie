import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { RaspisanieService } from 'src/app/shared/services/raspisanie.service';
import { BehaviorSubject } from 'rxjs';
import { IGroup } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeletePopupComponent implements OnInit {

  formDelete = this.fb.group({
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
    const values = this.formDelete.value;
    this.dialogRef.close(values.groups);

  }
}
