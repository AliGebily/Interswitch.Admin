import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import {
  FuseNavigationModule,
  FuseSearchBarModule,
  RatingItemModule,
  ImgThumbnailModule,
  CustomCalendarModule,
  FuseSidebarModule,
  FuseThemeOptionsModule
} from '@fuse/components';

import { FuseContentModule } from 'app/main/content/content.module';
import { FuseNavbarModule } from 'app/main/navbar/navbar.module';
import { FuseQuickPanelModule } from 'app/main/quick-panel/quick-panel.module';
import { FuseToolbarModule } from 'app/main/toolbar/toolbar.module';

import { FuseMainComponent } from './main.component';

@NgModule({
  declarations: [FuseMainComponent],
  imports: [
    RouterModule,

    MatSidenavModule,

    FuseSharedModule,

    FuseThemeOptionsModule,
    FuseNavigationModule,
    FuseSearchBarModule,
    RatingItemModule,
    ImgThumbnailModule,
    CustomCalendarModule,
    FuseSidebarModule,

    FuseContentModule,
    FuseNavbarModule,
    FuseQuickPanelModule,
    FuseToolbarModule
  ],
  exports: [FuseMainComponent]
})
export class FuseMainModule {}
