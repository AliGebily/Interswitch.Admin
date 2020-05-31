import { Component, HostBinding, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MatSnackBar, MatSnackBarVerticalPosition } from "@angular/material";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

import { fuseAnimations } from "@fuse/animations/index";
import { FuseConfigService } from "@fuse/services/config.service";
import { HttpClientService } from "@fuse/services/http-client.service";
import { timeout } from "q";

@Component({
  selector: "fuse-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
  animations: fuseAnimations
})
export class FuseContentComponent implements OnDestroy {
  onConfigChanged: Subscription;
  fuseSettings: any;

  @HostBinding("@routerTransitionUp") routeAnimationUp = false;
  @HostBinding("@routerTransitionDown") routeAnimationDown = false;
  @HostBinding("@routerTransitionRight") routeAnimationRight = false;
  @HostBinding("@routerTransitionLeft") routeAnimationLeft = false;
  @HostBinding("@routerTransitionFade") routeAnimationFade = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fuseConfig: FuseConfigService,
    private httpClientService: HttpClientService,
    public snackBar: MatSnackBar
  ) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .subscribe(event => {
        switch (this.fuseSettings.routerAnimation) {
          case "fadeIn":
            this.routeAnimationFade = !this.routeAnimationFade;
            break;
          case "slideUp":
            this.routeAnimationUp = !this.routeAnimationUp;
            break;
          case "slideDown":
            this.routeAnimationDown = !this.routeAnimationDown;
            break;
          case "slideRight":
            this.routeAnimationRight = !this.routeAnimationRight;
            break;
          case "slideLeft":
            this.routeAnimationLeft = !this.routeAnimationLeft;
            break;
        }
        this.snackBar.dismiss();
      });

    this.onConfigChanged = this.fuseConfig.onConfigChanged.subscribe(
      newSettings => {
        this.fuseSettings = newSettings;
      }
    );
    this.httpClientService.onHttpError.subscribe(errorMessage => {
      if (errorMessage === undefined) return;
      this.snackBar.open(errorMessage, "Close", {
        duration: 30000,
        verticalPosition: "top",
        extraClasses: "error-message"
      });
    });
  }

  ngOnDestroy() {
    this.onConfigChanged.unsubscribe();
  }
}
