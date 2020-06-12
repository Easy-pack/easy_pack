import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";

import { DriverRoutingModule } from "./driver-routing.module";
import { DriverComponent } from "./driver.component";
import { DriverSidebarComponent } from "../../Components/driver/driver-sidebar/driver-sidebar.component";
import { DriverNavbarComponent } from "../../Components/driver/driver-navbar/driver-navbar.component";
import { DriverBoardComponent } from "../../Components/driver/driver-board/driver-board.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DriverProfileComponent } from "../../Components/driver/driver-profile/driver-profile.component";
import { DriverHistoryComponent } from "../../Components/driver/driver-history/driver-history.component";
import { AnnouncementComponent } from "../../Components/driver/announcement/announcement.component";
@NgModule({
  declarations: [
    DriverComponent,
    DriverNavbarComponent,
    DriverSidebarComponent,
    DriverBoardComponent,
    DriverProfileComponent,
    DriverHistoryComponent,
    AnnouncementComponent,
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class DriverModule {}
