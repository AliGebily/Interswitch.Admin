import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { CustomCalendarComponent } from './custom-calendar.component';
import { FusePipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [CustomCalendarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FusePipesModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [CustomCalendarComponent]
})
export class CustomCalendarModule {}
