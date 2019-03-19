import { Component, OnInit } from '@angular/core';
import { RaspisanieService } from 'src/app/shared/services/raspisanie.service';
import { IGroup } from 'src/app/shared/models/group.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ChangeSubjectComponent } from 'src/app/shared/componets/popup/change-subject/change-subject.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(
    private raspisanieService: RaspisanieService,
    private route: ActivatedRoute,
    public dialog: MatDialog

    ) { }
  group: IGroup;
  days: string[];
  timeLesson: string[];
  subjects: string[];
  editMode = false;
  title: string;

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.raspisanieService.getGroupById(id).subscribe((group) => {
      this.group = <IGroup>group;
      this.getTitle();
    });
    this.raspisanieService.timeLesson.subscribe((time) => {
      this.timeLesson = time;
    });
    this.raspisanieService.subjects.subscribe((subjects) => {
      this.subjects = subjects;
    });
    this.days = this.raspisanieService.days;

    this.editMode = this.route.snapshot.queryParams.edit;

  }

  getTitle() {
    if (!this.editMode) {
      this.title = 'Расписание занятий студентов';
    } else {
      const textForGroup = this.group.name;
      this.title = `Изменение расписания для ${textForGroup}`;
    }
  }

  editGroup(infoForGroup) {
    const dialogRef = this.dialog.open(ChangeSubjectComponent, {
      width: '450px',
      data: infoForGroup
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        const indexSubj = this.subjects.indexOf(result);
        infoForGroup.group.subjects[infoForGroup.dayNum][infoForGroup.idx] = indexSubj;

        this.raspisanieService.changeGroupDb(infoForGroup.group);
      }

    });
  }

  clickOnSubject(group, num, arraySybjectFotDay, dayNum, idx): void {

    if (this.editMode) {
      const infoForGroup =  {
        group,
        num,
        arraySybjectFotDay,
        dayNum,
        subjects: this.subjects,
        idx
      };
      this.editGroup(infoForGroup);
    }
  }
}
