import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //the default pathMatch is 'prefix' and checks from the left to see the match
  { path: 'employee', component: EmployeeComponent },

  { path: 'login', component: LoginComponent },

  //WILD CARD ROUTE
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
