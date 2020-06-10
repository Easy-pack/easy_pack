import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";

import { DriverRoutingModule } from "./driver-routing.module";
import { DriverComponent } from "./driver.component";
import { DriverSidebarComponent } from "../../components/driver/driver-sidebar/driver-sidebar.component";
import { DriverNavbarComponent } from "../../components/driver/driver-navbar/driver-navbar.component";
import { DriverBoardComponent } from "../../components/driver/driver-board/driver-board.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DriverProfileComponent } from "../../components/driver/driver-profile/driver-profile.component";

@NgModule({
  declarations: [
    DriverComponent,
    DriverNavbarComponent,
    DriverSidebarComponent,
    DriverBoardComponent,
    DriverProfileComponent,
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
