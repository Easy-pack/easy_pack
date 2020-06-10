import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DriverComponent } from "./driver.component";
import { DriverBoardComponent } from "../../Components/driver/driver-board/driver-board.component";
import { DriverProfileComponent } from "../../Components/driver/driver-profile/driver-profile.component";
import { DriverHistoryComponent } from "../../Components/driver/driver-history/driver-history.component";
import { AnnouncementComponent } from "../../Components/driver/announcement/announcement.component";

const routes: Routes = [
  {
    path: "",
    component: DriverComponent,
    children: [
      { path: "profile", component: DriverProfileComponent },
      { path: "history", component: DriverHistoryComponent },
      { path: "board", component: DriverBoardComponent },
      { path: "announcement", component: AnnouncementComponent },
      { path: "", redirectTo: "board", pathMatch: "full" },
      { path: "**", redirectTo: "board" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverRoutingModule {}
