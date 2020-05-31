import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";

import { FUSE_CONFIG, FuseConfigService } from "@fuse/services/config.service";
import { FuseCopierService } from "@fuse/services/copier.service";
import { FuseMatchMediaService } from "@fuse/services/match-media.service";
import { FuseMatSidenavHelperService } from "@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service";
import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { FuseSplashScreenService } from "@fuse/services/splash-screen.service";
import { GlobalService } from "@fuse/services/global.service";
import { HttpClientService } from "@fuse/services/http-client.service";
import { UtilService } from "@fuse/services/util.service";

@NgModule({
  entryComponents: [],
  providers: [
    FuseConfigService,
    FuseCopierService,
    FuseMatchMediaService,
    FuseMatSidenavHelperService,
    FuseNavigationService,
    FuseSidebarService,
    FuseSplashScreenService,
    GlobalService,
    HttpClientService,
    UtilService
  ]
})
export class FuseModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: FuseModule
  ) {
    if (parentModule) {
      throw new Error(
        "FuseModule is already loaded. Import it in the AppModule only!"
      );
    }
  }

  static forRoot(config): ModuleWithProviders {
    return {
      ngModule: FuseModule,
      providers: [
        {
          provide: FUSE_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
