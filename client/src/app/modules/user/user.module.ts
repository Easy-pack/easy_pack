import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { UserNavbarComponent } from "../../Components/user/user-navbar/user-navbar.component";
import { UserSidebarComponent } from "../../Components/user/user-sidebar/user-sidebar.component";
import { UserBoardComponent } from "../../Components/user/user-board/user-board.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserProfileComponent } from "../../Components/user/user-profile/user-profile.component";
import { UserAddTransactionComponent } from "../../Components/user/user-add-transaction/user-add-transaction.component";
import { UserHistoryComponent } from "../../Components/user/user-history/user-history.component";
import { MapComponent } from "../../Components/user/map/map.component";
import { AgmCoreModule, MapsAPILoader } from "@agm/core";
import { ShippingComponent } from "../../Components/user/shipping/shipping.component";

@NgModule({
  declarations: [
    UserComponent,
    UserSidebarComponent,
    UserNavbarComponent,
    UserBoardComponent,
    UserProfileComponent,
    UserAddTransactionComponent,
    UserHistoryComponent,
    ShippingComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD4sdh0NM2UU2aazlnc4wvCVeSRuiwC5C0",
      libraries: ["places", "geometry"],
      /* apiKey is required, unless you are a premium customer, in which case you can use clientId */
    }),
  ],
})
export class UserModule {}
