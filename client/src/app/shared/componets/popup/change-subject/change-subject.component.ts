import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-change-subject',
  templateUrl: './change-subject.component.html',
  styleUrls: ['./change-subject.component.css']
})
export class ChangeSubjectComponent implements OnInit {
  formEditSubject = this.fb.group({
    subject: ['']
  });

  constructor(
    @Optional() public dialogRef: MatDialogRef<ChangeSubjectComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public info: any,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.formEditSubject.setValue({
      subject: this.info.subjects[this.info.num]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.formEditSubject.value.subject);

  }
}
