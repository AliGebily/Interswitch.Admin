import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import "hammerjs";
import {
  MatProgressSpinnerModule,
  MatCardModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatButtonModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatDivider,
  MatSnackBarModule,
  MatSpinner
} from "@angular/material";
import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";

import { fuseConfig } from "./fuse-config";

import { AppComponent } from "./app.component";
import { FuseMainModule } from "./main/main.module";

import { ErrorsModule } from "./main/content/errors/errors.module";
import { LookupsModule } from "./main/content/lookups/lookups.module";
import { AuthenticationModule } from "./main/content/authentication/authentication.module";
import { MessagesModule } from "./main/content/messages/messages.module";
import { UsersModule } from "./main/content/users/users.module";
import { environment } from "../environments/environment";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: environment.LOGIN_URL,
    pathMatch: "full"
  },
  {
    path: "app",
    redirectTo: environment.LOGIN_URL,
    pathMatch: "full"
  }
  ,
  {
    path: "**",
    redirectTo: "errors/404",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    // Fuse Main and Shared modules
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,
    FuseMainModule,
    ErrorsModule,
    LookupsModule,
    AuthenticationModule,
    MessagesModule,
    UsersModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}