import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { RaspisanieService } from 'src/app/shared/services/raspisanie.service';


const defaultSubjects = {
  '0': [9, 9, 9, 9, 9, 9, 9, 9],
  '1': [9, 9, 9, 9, 9, 9, 9, 9],
  '2': [9, 9, 9, 9, 9, 9, 9, 9],
  '3': [9, 9, 9, 9, 9, 9, 9, 9],
  '4': [9, 9, 9, 9, 9, 9, 9, 9]
};

@Component({
  selector: 'app-add-popup',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddPopupComponent implements OnInit {

  formCreate = this.fb.group({
    course: [null, [Validators.required]],
    name: [null, [Validators.required]]
  });

  constructor(
    @Optional() public dialogRef: MatDialogRef<AddPopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public user: any, //
    private fb: FormBuilder,
    private raspisanieService: RaspisanieService
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const newGroup = this.formCreate.value;
    newGroup.subjects = defaultSubjects;
    console.log(newGroup);
    this.dialogRef.close(newGroup);


  }
}
