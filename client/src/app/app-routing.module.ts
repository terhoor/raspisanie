import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaspisanieComponent } from './raspisanie/raspisanie.component';
import { GroupComponent } from './raspisanie/group/group.component';
import { OtherComponent } from './other/other.component';

// import { AuthGuard } from './auth.guard';


const appRoutes: Routes = [
  { path: 'raspisanie', component: RaspisanieComponent },
  { path: 'other', component: OtherComponent },
  { path: 'raspisanie/:id', component: GroupComponent },
  { path: '**', redirectTo: '/raspisanie' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
