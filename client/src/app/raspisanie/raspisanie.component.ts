import { Component, OnInit } from '@angular/core';
import { RaspisanieService } from '../shared/services/raspisanie.service';

@Component({
  selector: 'app-raspisanie',
  templateUrl: './raspisanie.component.html',
  styleUrls: ['./raspisanie.component.css']
})
export class RaspisanieComponent implements OnInit {
  groups$: any;
  subjects$: any;
  displayedColumns: string[] = ['1 course', '2 course', '3 course', '4 course'];
  objGroups = {
    '1': [],
    '2': [],
    '3': [],
    '4': []
  };

  constructor(private raspisanieService: RaspisanieService) { }



  ngOnInit() {
    this.raspisanieService.groups.subscribe((groups) => {
      this.groups$ = groups;
      groups.forEach((group) => {
        const indexCourse = group.course;
          this.objGroups[indexCourse.toString()].push(group);
      });

    });

    this.raspisanieService.subjects.subscribe((subjects) => {
      this.subjects$ = subjects;
    });
  }

}
