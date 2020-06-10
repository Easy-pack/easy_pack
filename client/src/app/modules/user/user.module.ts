import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { UserNavbarComponent } from "../../components/user/user-navbar/user-navbar.component";
import { UserSidebarComponent } from "../../components/user/user-sidebar/user-sidebar.component";
import { UserBoardComponent } from "../../components/user/user-board/user-board.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserProfileComponent } from "../../components/user/user-profile/user-profile.component";

@NgModule({
  declarations: [
    UserComponent,
    UserSidebarComponent,
    UserNavbarComponent,
    UserBoardComponent,
    UserProfileComponent,
  ],
  imports: [CommonModule, UserRoutingModule, NgbModule],
})
export class UserModule {}
