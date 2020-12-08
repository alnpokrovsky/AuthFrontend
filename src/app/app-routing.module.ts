import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '@components/auth/auth.component';
import { UserInfoComponent } from '@components/user-info/user-info.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  { path: 'auth', children: [
      { path: '', component: AuthComponent },
  ]},
  { path: 'user', children: [
    { path: '', component: UserInfoComponent },
  ]},
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
