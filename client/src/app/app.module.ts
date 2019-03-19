import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RaspisanieComponent } from './raspisanie/raspisanie.component';
import { GroupComponent } from './raspisanie/group/group.component';
import { RaspisanieService } from './shared/services/raspisanie.service';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/componets/loader/loader.component';
import { OtherComponent } from './other/other.component';
import { AddPopupComponent } from './shared/componets/popup/add/add.component';
import { DeletePopupComponent } from './shared/componets/popup/delete/delete.component';
import { EditPopupComponent } from './shared/componets/popup/edit/edit.component';
import { ChangeSubjectComponent } from './shared/componets/popup/change-subject/change-subject.component';


@NgModule({
  declarations: [
    AppComponent,
    RaspisanieComponent,
    GroupComponent,
    LoaderComponent,
    OtherComponent,
    AddPopupComponent,
    DeletePopupComponent,
    EditPopupComponent,
    ChangeSubjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    AddPopupComponent,
    DeletePopupComponent,
    EditPopupComponent,
    ChangeSubjectComponent
],
  providers: [RaspisanieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
