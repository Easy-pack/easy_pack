import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DriverRoutingModule } from "./driver-routing.module";
import { DriverComponent } from "./driver.component";
import { DriverSidebarComponent } from "./driver-sidebar/driver-sidebar.component";
import { DriverNavbarComponent } from "./driver-navbar/driver-navbar.component";
import { DriverBoardComponent } from "./driver-board/driver-board.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    DriverComponent,
    DriverNavbarComponent,
    DriverSidebarComponent,
    DriverBoardComponent,
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DriverModule {}
