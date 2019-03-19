import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { IGroup } from '../models/group.model';
import { map } from 'rxjs/operators';

const urlSite = 'https://polar-cove-86039.herokuapp.com';
const urlLocalhost = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class RaspisanieService {

  groups: BehaviorSubject<IGroup[]> = new BehaviorSubject([]);
  subjects: BehaviorSubject<string[]> = new BehaviorSubject([]);
  timeLesson: BehaviorSubject<string[]> = new BehaviorSubject([]);
  days = ['пн', 'вт', 'ср', 'чт', 'пт'];

  constructor(
    private http: HttpClient
  ) {
    this.updateGroups();
    this.getSubjects().subscribe((subjects) => {
      this.subjects.next(subjects);
    });
    this.getTimeLesson().subscribe((data) => {
      this.timeLesson.next(data);
    });
  }

  updateGroups(): void {
    const sub = this.getGroups().subscribe((groupsData) => {
      console.log(groupsData);
      this.groups.next(groupsData);
    });
  }

  getGroups(): Observable<any> {
    return this.http.get(`${urlSite}/api/data/groups`).pipe(map(data => {
      return data;
    }));
  }

  getSubjects(): Observable<any> {
    return this.http.get(`${urlSite}/api/data/subjects`).pipe(map(data => {
      return data;
    }));
  }

  getTimeLesson(): Observable<any> {
    return this.http.get(`${urlSite}/api/data/timeLesson`).pipe(map(data => {
      return data;
    }));
  }

  getGroupById(id): Observable<IGroup> {
    return this.http.get(`${urlSite}/api/data/group/${id}`).pipe(map(data => {
      return <IGroup | any>data;
    }));
  }


  createNewGroup(group): void {
    const subject = new Subject();
    this.http.post(`${urlSite}/api/data/group-create`, group)
      .subscribe((groupWithId) => {
        subject.next(groupWithId);
    });
  }

  deleteGroup(id) {
    this.http.get(`${urlSite}/api/data/group-delete/${id}`).subscribe();
  }

  changeGroupDb(group) {
    this.http.post(`${urlSite}/api/data/group-change`, group).subscribe();
  }

}
