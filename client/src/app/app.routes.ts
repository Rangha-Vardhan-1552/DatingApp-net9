import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGaurdGuard } from './_gaurds/auth-gaurd.guard';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    //we are protecting the routes  by following below code
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate:[authGaurdGuard],
        children:[
            {path:'members',component:MemberListComponent},
            {path:'members/:id',component:MemberDetailsComponent},
            {path:'lists',component:ListsComponent},
            {path:'messages',component:MessagesComponent},
        ]
    },
    {path:'**',component:HomeComponent,pathMatch:'full'},
];
