import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserBoardComponent} from './user-board/user-board.component';
import {UserHistoryComponent} from './user-history/user-history.component';
import {UserAddTransactionComponent} from './user-add-transaction/user-add-transaction.component';

const routes: Routes = [
  {path: '', component: UserComponent,
    children: [
      {path : 'profile', component: UserProfileComponent},
      {path : 'board', component: UserBoardComponent},
      {path: 'history', component: UserHistoryComponent},
      {path: 'addTransaction', component: UserAddTransactionComponent},
      {path: '', redirectTo: 'board', pathMatch: 'full'},
      {path: '**', redirectTo: 'board'}
    ]
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
