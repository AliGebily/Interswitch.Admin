import { Component } from '@angular/core';
import { Location, HashLocationStrategy } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { GlobalService } from '@fuse/services/global.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'fuse-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class FuseToolbarComponent {
  userStatusOptions: any[];
  showLoadingBar: boolean;
  horizontalNav: boolean;
  noNav: boolean;
  loggedInUser: string = null;

  constructor(
    private router: Router,
    private fuseConfig: FuseConfigService,
    private sidebarService: FuseSidebarService,
    private globalService: GlobalService,
    private location: Location
  ) {
    this.globalService.onAuthenticationInfoChanged.subscribe(
      authenticationInfo => {
        if (authenticationInfo === undefined) return;
        if (authenticationInfo && authenticationInfo.user) {
          this.loggedInUser = authenticationInfo.user.name;
        } else {
          this.loggedInUser = null;
        }
      }
    );
    this.userStatusOptions = [
      {
        title: 'Online',
        icon: 'icon-checkbox-marked-circle',
        color: '#4CAF50'
      },
      {
        title: 'Away',
        icon: 'icon-clock',
        color: '#FFC107'
      },
      {
        title: 'Do not Disturb',
        icon: 'icon-minus-circle',
        color: '#F44336'
      },
      {
        title: 'Invisible',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#BDBDBD'
      },
      {
        title: 'Offline',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#616161'
      }
    ];
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showLoadingBar = true;
      }
      if (event instanceof NavigationEnd) {
        this.showLoadingBar = false;
      }
    });

    this.fuseConfig.onConfigChanged.subscribe(settings => {
      this.horizontalNav = settings.layout.navigation === 'top';
      this.noNav = settings.layout.navigation === 'none';
    });
  }

  toggleSidebarOpened(key) {
    this.sidebarService.getSidebar(key).toggleOpen();
  }

  search(value) {
    // Do your search here...
  }
  logout() {
    this.globalService.logout();
  }
  goBack() {
    this.location.back();
  }
}
