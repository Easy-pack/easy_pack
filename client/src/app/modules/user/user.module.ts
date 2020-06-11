import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { UserNavbarComponent } from "../../Components/user/user-navbar/user-navbar.component";
import { UserSidebarComponent } from "../../Components/user/user-sidebar/user-sidebar.component";
import { UserBoardComponent } from "../../Components/user/user-board/user-board.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserProfileComponent } from "../../Components/user/user-profile/user-profile.component";
import {UserAddTransactionComponent} from "../../Components/user/user-add-transaction/user-add-transaction.component"

@NgModule({
  declarations: [
    UserComponent,
    UserSidebarComponent,
    UserNavbarComponent,
    UserBoardComponent,
    UserProfileComponent,
    UserAddTransactionComponent,
  ],
  imports: [CommonModule, UserRoutingModule, NgbModule, ReactiveFormsModule],
})
export class UserModule {}
