import { Component, OnInit } from '@angular/core';
import { RaspisanieService } from '../shared/services/raspisanie.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddPopupComponent } from '../shared/componets/popup/add/add.component';
import { DeletePopupComponent } from '../shared/componets/popup/delete/delete.component';
import { EditPopupComponent } from '../shared/componets/popup/edit/edit.component';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  constructor(
    private raspisanieService: RaspisanieService,
    public dialog: MatDialog,
    private router: Router
  ) {

  }
  ngOnInit() {
  }

  addNewGroup() {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(newGroup => {
      if (!!newGroup) {
        this.raspisanieService.createNewGroup(newGroup);
      }
    });
  }

  editGroup() {
    const dialogRef = this.dialog.open(EditPopupComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(selectGroup => {
      if (!!selectGroup) {
        // this.raspisanieService.selectGroupDb(selectGroup);
        console.log(selectGroup);
        this.router.navigate(['raspisanie', selectGroup], {queryParams: {
          'edit': true
        }});
      }
    });
  }

  deleteGroup() {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.raspisanieService.deleteGroup(result);
      this.raspisanieService.updateGroups();
    });
  }

}
