import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@components/login/login.component';
import { UserInfoComponent } from '@components/user-info/user-info.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', children: [
      { path: '', component: LoginComponent },
  ]},
  { path: 'user', children: [
    { path: '', component: UserInfoComponent },
]},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
