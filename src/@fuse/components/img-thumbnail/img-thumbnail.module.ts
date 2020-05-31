import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ImgThumbnailComponent } from './img-thumbnail.component';
import { FusePipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ImgThumbnailComponent],
  imports: [
    CommonModule,
    RouterModule,
    FusePipesModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ImgThumbnailComponent]
})
export class ImgThumbnailModule {}
