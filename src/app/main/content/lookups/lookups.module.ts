import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CdkTableModule } from "@angular/cdk/table";
import {
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
  MatDivider
} from "@angular/material";

import { FuseSharedModule } from "@fuse/shared.module";
import { LookupsService } from "./lookups.service";
import { StaticLookups } from "./static-lookups";

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CdkTableModule,
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

    FuseSharedModule
  ],
  exports: [],
  providers: [LookupsService]
})
export class LookupsModule {}
