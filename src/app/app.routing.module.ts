import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@components/login/login.component';




const routes: Routes = [
    { path: '', redirectTo: '/login',  pathMatch: 'full' },
    { path: 'login', children: [
        { path: '', component: LoginComponent },
    ]},
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
