import { Component } from '@angular/core';

import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { GlobalService } from '../@fuse/services/global.service';
import { HttpClientService } from '@fuse/services/http-client.service';

@Component({
  selector: 'fuse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  previewImageSrc = null;
  isConnectingToServer: boolean = false;
  isConnectingToServerTimeoutHandler = null;

  constructor(
    private fuseNavigationService: FuseNavigationService,
    private fuseSplashScreen: FuseSplashScreenService,
    private globalService: GlobalService,
    private httpClientService: HttpClientService
  ) {
    this.globalService.onImagePreview.subscribe(data => {
      this.previewImageSrc = data;
    });
    let onHttpErrorSubscribtion = this.httpClientService.onHttpError.subscribe(
      data => {
        if (data === undefined) return;
        this.fuseSplashScreen.hide();
        onHttpErrorSubscribtion.unsubscribe();
      }
    );
    
    this.httpClientService.onRequestStarted.subscribe(data => {
      if (data === undefined) return;
      clearTimeout(this.isConnectingToServerTimeoutHandler);
      this.isConnectingToServerTimeoutHandler = setTimeout(() => {
        this.isConnectingToServer = true;
      }, 100);
    });
    this.httpClientService.onAllRequestsFinished.subscribe(data => {
      if (data === undefined) return;
      clearTimeout(this.isConnectingToServerTimeoutHandler);
      this.isConnectingToServerTimeoutHandler = setTimeout(() => {
        this.isConnectingToServer = false;
      }, 0);
    });
  }
}
