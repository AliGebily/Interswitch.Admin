import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatCheckboxModule,
  MatInputModule
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { LoginComponent } from "./components/login/login.component";
import { LockComponent } from "./components/lock/lock.component";
import { AuthenticationService } from "./authentication.service";

const routes = [
  {
    path: "auth/login",
    component: LoginComponent
  },

  {
    path: "auth/lock",
    component: LockComponent
  }
];

@NgModule({
  exports: [LoginComponent, LockComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [LoginComponent, LockComponent],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}
