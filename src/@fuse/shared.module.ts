import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { RatingItemModule } from '@fuse/components/rating-item/rating-item.module';
import { ImgThumbnailModule } from '@fuse/components/img-thumbnail/img-thumbnail.module';
import { CustomCalendarModule } from '@fuse/components/custom-calendar/custom-calendar.module';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
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
  MatRadioModule,
  MatCheckboxModule,
  MatDialog,
  MatDialogModule
} from '@angular/material';

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      return date.toDateString();
    }
  }
}
export const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    FuseDirectivesModule,
    FusePipesModule,
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
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    RatingItemModule,
    ImgThumbnailModule,
    CustomCalendarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FuseDirectivesModule,
    FusePipesModule,
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
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    RatingItemModule,
    ImgThumbnailModule,
    CustomCalendarModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    }
  ]
})
export class FuseSharedModule {}
