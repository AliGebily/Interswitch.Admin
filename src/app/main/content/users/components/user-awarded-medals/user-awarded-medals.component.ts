import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { UsersService } from '../../users.service';
import { LookupsService } from '../../../lookups/lookups.service';
import { StaticLookups } from '../../../lookups/static-lookups';

import { environment } from 'environments/environment';
import { UtilService } from '@fuse/services/util.service';
import { EnumConstants } from '@fuse/services/enum.constants';

@Component({
  selector: 'user-awarded-medals',
  templateUrl: './user-awarded-medals.component.html',
  styleUrls: ['./user-awarded-medals.component.scss'],
  animations: fuseAnimations
})
export class UserAwardedMedalsComponent implements OnInit {
  userAwardedMedalsSearchResult: any;
  goldenMedals: any[];
  eligibleManuallyAwardedMedals: any[];
  users: any[];

  @ViewChild('searchPanel')
  searchPanel: any;
  //filter

  criteriaFilter: any = {};

  userAwardedMedalsDataSource: MatTableDataSource<any>;
  displayedColumns = [
    'medalTitle',
    'userTitle',
    'awardedAt',
    'description',
    'actions'
  ];
  pageTitle: string = 'Awarded Medals';

  staticLookups = StaticLookups;

  @ViewChild('viewUserAwardedMedalDialogTemplate')
  viewUserAwardedMedalDialogTemplate: any;

  @ViewChild('deleteUserAwardedMedalDialogTemplate')
  deleteUserAwardedMedalDialogTemplate: any;

  @ViewChild('awardUserMedalDialogTemplate')
  awardUserMedalDialogTemplate: any;

  selectedUserAwardedMedal: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private utilService: UtilService,
    private lookupsService: LookupsService,
    private dialog: MatDialog
  ) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    this.resetCriteriaFilter();
    this.userAwardedMedalsSearchResult = this.usersService.userAwardedMedalsSearchResult;
    this.goldenMedals = this.lookupsService.medals.filter(
      medal => medal.isGolden
    );
    this.eligibleManuallyAwardedMedals = this.lookupsService.medals.filter(
      medal => medal.id == 8 // only exceptional can be awarded manually
    );
    this.users = this.lookupsService.users;
    this.userAwardedMedalsDataSource = new MatTableDataSource(
      this.userAwardedMedalsSearchResult.userAwardedMedals
    );
  }

  sortData($event) {
    this.criteriaFilter.sortBy = $event.active;
    this.criteriaFilter.sortType =
      $event.direction.toUpperCase() == 'DESC'
        ? EnumConstants.Sort_direction.Desc
        : EnumConstants.Sort_direction.Asc;
    this.criteriaFilter.page_index = 0;
    this.search(false);
  }
  PaginationChanged($event) {
    this.criteriaFilter.page_index = $event.pageIndex;
    this.criteriaFilter.limit = $event.pageSize;
    this.search(false, true);
  }
  resetCriteriaFilter() {
    this.criteriaFilter = {
      page_index: 0,
      limit: environment.DEFUALT_LIMIT,
      sortBy: 'id',
      sortType: EnumConstants.Sort_direction.Desc,
      medalId: null,
      username: null
    };
  }
  clearCriteriaFilter() {
    this.resetCriteriaFilter();
    this.search(true);
  }
  search(reOpenSearchPanelIfFailed, keepPageIndex = false) {
    if (!keepPageIndex) {
      this.criteriaFilter.page_index = 0;
    }
    var searchCriteria = JSON.parse(JSON.stringify(this.criteriaFilter));
    searchCriteria.offset = searchCriteria.page_index * searchCriteria.limit;
    delete searchCriteria.page_index;
    if (reOpenSearchPanelIfFailed) {
      this.searchPanel.close();
    }

    this.usersService.getUserAwardedMedals(searchCriteria).then(
      userAwardedMedalsSearchResultResponse => {
        this.userAwardedMedalsSearchResult = userAwardedMedalsSearchResultResponse;
        this.userAwardedMedalsDataSource = new MatTableDataSource(
          this.userAwardedMedalsSearchResult.userAwardedMedals
        );
      },
      () => {
        if (reOpenSearchPanelIfFailed) {
          this.searchPanel.open();
        }
      }
    );
  }
  isDialogedOpened = false;
  viewUserAwardedMedal(userAwardedMedal) {
    if (this.isDialogedOpened) {
      return;
    }
    if (this.selectedUserAwardedMedal == userAwardedMedal) {
      this.selectedUserAwardedMedal = null;
      return;
    }
    this.selectedUserAwardedMedal = userAwardedMedal;
    this.isDialogedOpened = true;

    let dialogRef = this.dialog.open(this.viewUserAwardedMedalDialogTemplate, {
      width: '500px'
    });
    this.selectedUserAwardedMedal = userAwardedMedal;
    dialogRef.afterClosed().subscribe(result => {
      this.selectedUserAwardedMedal = null;
      this.isDialogedOpened = false;
    });
  }
  openDeleteUserAwardedMedalDialog(userAwardedMedal): void {
    this.selectedUserAwardedMedal = userAwardedMedal;
    this.isDialogedOpened = true;
    let dialogRef = this.dialog.open(
      this.deleteUserAwardedMedalDialogTemplate,
      {
        width: '500px'
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.selectedUserAwardedMedal = null;
      this.isDialogedOpened = false;
      if (result) {
        this.usersService
          .deleteUserAwardedMedal(userAwardedMedal.id)
          .then(response => {
            this.search(false);
          });
      }
    });
  }
  openAwardUserMedalDialog(): void {
    if (
      !this.selectedUserAwardedMedal ||
      this.selectedUserAwardedMedal.medalId > -1
    ) {
      this.selectedUserAwardedMedal = { medalId: 8 };
    }
    this.isDialogedOpened = true;
    let dialogRef = this.dialog.open(this.awardUserMedalDialogTemplate, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isDialogedOpened = false;
      if (result) {
        this.usersService
          .awardMedals(this.selectedUserAwardedMedal)
          .then(response => {
            this.selectedUserAwardedMedal = null;
            this.search(false);
          })
          .catch(response => {
            this.openAwardUserMedalDialog();
          });
      }
    });
  }
}
