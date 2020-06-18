import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserProfileComponent } from '../../Components/user/user-profile/user-profile.component';
import { UserBoardComponent } from '../../Components/user/user-board/user-board.component';
import { UserHistoryComponent } from '../../Components/user/user-history/user-history.component';
import { UserAddTransactionComponent } from '../../Components/user/user-add-transaction/user-add-transaction.component';
import { ShippingComponent } from '../../Components/user/shipping/shipping.component';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'board', component: UserBoardComponent },
      { path: 'history', component: UserHistoryComponent },
      { path: 'addTransaction', component: UserAddTransactionComponent },
      { path: 'shippingDetails', component: ShippingComponent },
      { path: '', redirectTo: 'board', pathMatch: 'full' },
      { path: '**', redirectTo: 'board' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
