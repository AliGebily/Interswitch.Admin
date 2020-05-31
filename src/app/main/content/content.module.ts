import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
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
  MatSnackBarModule
} from "@angular/material";

import { FuseSharedModule } from "@fuse/shared.module";

import { FuseContentComponent } from "app/main/content/content.component";

@NgModule({
  declarations: [FuseContentComponent],
  imports: [RouterModule, MatProgressSpinnerModule, FuseSharedModule, MatFormFieldModule, MatSnackBarModule],
  exports: [FuseContentComponent]
})
export class FuseContentModule {}
