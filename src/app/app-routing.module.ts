import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import {LayoutComponent} from './template/layout/layout.component';
import { UserManagementComponent } from './user-management/user-management.component'; 
import { ContactUsComponent } from './contact-us/contact-us.component';
const routes: Routes = [
 // { path: '', component: LoginComponent, pathMatch:'full' },
  //{ path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  // Auth pages routes goes here here
  { 
    path: 'user',
    component: LayoutComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'list', component: UserManagementComponent, canActivate: [AuthGuard] },
      { path: 'contactus', component: ContactUsComponent, canActivate: [AuthGuard] }
      
    ]
},

//no Auth routes
{ path: 'login', component: LoginComponent },
{ path: 'logout', component: LoginComponent},
{ path: '', redirectTo:'/login', pathMatch:'full'},
{ path: '**', redirectTo: '/login' }

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
