import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserComponent } from "./user.component";
import { UserProfileComponent } from "../../components/user/user-profile/user-profile.component";
import { UserBoardComponent } from "../../components/user/user-board/user-board.component";
import { UserHistoryComponent } from "../../components/user/user-history/user-history.component";
import { UserAddTransactionComponent } from "../../components/user/user-add-transaction/user-add-transaction.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      { path: "profile", component: UserProfileComponent },
      { path: "board", component: UserBoardComponent },
      { path: "history", component: UserHistoryComponent },
      { path: "addTransaction", component: UserAddTransactionComponent },
      { path: "", redirectTo: "board", pathMatch: "full" },
      { path: "**", redirectTo: "board" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}