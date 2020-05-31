import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@angular/cdk/platform";
import { Subscription } from "rxjs/Subscription";

import { FuseConfigService } from "@fuse/services/config.service";
import { GlobalService } from "@fuse/services/global.service";

@Component({
  selector: "fuse-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class FuseMainComponent implements OnDestroy {
  onConfigChanged: Subscription;
  fuseSettings: any;
  @HostBinding("attr.fuse-layout-mode") layoutMode;

  showNavigationBars: boolean = false;
  isLoginScreen: boolean = false;
  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private fuseConfig: FuseConfigService,
    private platform: Platform,
    private globalService: GlobalService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.globalService.onAuthenticationInfoChanged.subscribe(() => {
      this.showNavigationBars =
        this.globalService.isLoggedIn() && !this.isLoginScreen;
    });
    this.globalService.onLoginScreen.subscribe(isLoginScreen => {
      this.isLoginScreen = isLoginScreen;
      this.showNavigationBars =
        this.globalService.isLoggedIn() && !this.isLoginScreen;
    });
    this.onConfigChanged = this.fuseConfig.onConfigChanged.subscribe(
      newSettings => {
        this.fuseSettings = newSettings;
        this.layoutMode = this.fuseSettings.layout.mode;
      }
    );

    if (this.platform.ANDROID || this.platform.IOS) {
      this.document.body.className += " is-mobile";
    }
  }

  ngOnDestroy() {
    this.onConfigChanged.unsubscribe();
  }

  addClass(className: string) {
    this._renderer.addClass(this._elementRef.nativeElement, className);
  }

  removeClass(className: string) {
    this._renderer.removeClass(this._elementRef.nativeElement, className);
  }
}
