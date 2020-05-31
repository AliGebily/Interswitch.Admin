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
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: fuseAnimations
})
export class UsersComponent implements OnInit {
  usersSearchResult: any;
  regions: any[];
  teams: any[];

  @ViewChild('searchPanel')
  searchPanel: any;
  //filter

  criteriaFilter: any = {};

  usersDataSource: MatTableDataSource<any>;
  displayedColumns = [
    'index',
    'name',
    'team',
    'region',
    'quarterlyTargetCurrency',
    'quarterlyAchievedCurrency',
    'quarterlyAchievedPercent',
    'yearlyTargetCurrency',
    'yearlyAchievedCurrency',
    'yearlyAchievedPercent',
    // 'actions'
  ];
  pageTitle: string = 'Users';

  staticLookups = StaticLookups;

  @ViewChild('viewUserDialogTemplate')
  viewUserDialogTemplate: any;

  @ViewChild('deleteUserDialogTemplate')
  deleteUserDialogTemplate: any;

  @ViewChild('awardUserMedalDialogTemplate')
  awardUserMedalDialogTemplate: any;

  selectedUser: any;
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
    this.usersSearchResult = this.usersService.usersSearchResult;
    this.regions = this.lookupsService.regions;
    this.teams = this.lookupsService.teams;
    this.usersDataSource = new MatTableDataSource(this.usersSearchResult.users);
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
      region: null,
      team: null
    };
  }
  clearCriteriaFilter() {
    this.resetCriteriaFilter();
    this.search(true);
  }
  search(reOpenSearchPanelIfFailed, keepPageIndex = false) {
    if(!keepPageIndex){
      this.criteriaFilter.page_index =0;
    }
    var searchCriteria = JSON.parse(JSON.stringify(this.criteriaFilter));
    searchCriteria.offset = searchCriteria.page_index * searchCriteria.limit;
    delete searchCriteria.page_index;
    if (reOpenSearchPanelIfFailed) {
      this.searchPanel.close();
    }

    this.usersService.getUsers(searchCriteria).then(
      usersSearchResultResponse => {
        this.usersSearchResult = usersSearchResultResponse;
        this.usersDataSource = new MatTableDataSource(
          this.usersSearchResult.users
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
  viewUser(user) {
    if (this.isDialogedOpened) {
      return;
    }
    if (this.selectedUser == user) {
      this.selectedUser = null;
      return;
    }
    this.selectedUser = user;
    // return;
    // this.isDialogedOpened = true;

    // let dialogRef = this.dialog.open(this.viewUserDialogTemplate, {
    //   width: '500px'
    // });
    // this.selectedUser = user;
    // dialogRef.afterClosed().subscribe(result => {
    //   this.selectedUser = null;
    //   this.isDialogedOpened = false;
    // });
  }
  openDeleteUserDialog(user): void {
    this.selectedUser = user;
    return;
    // this.isDialogedOpened = true;
    // let dialogRef = this.dialog.open(this.deleteUserDialogTemplate, {
    //   width: '500px'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.selectedUser = null;
    //   this.isDialogedOpened = false;
    //   if (result) {
    //     this.usersService.activateUser(user.id).then(response => {
    //       this.search(false);
    //     });
    //   }
    // });
  }
  openAwardUserMedalDialog(): void {
    return;
    // if (!this.selectedUser || this.selectedUser.medalId > -1) {
    //   this.selectedUser = { medalId: 8 };
    // }
    // this.isDialogedOpened = true;
    // let dialogRef = this.dialog.open(this.awardUserMedalDialogTemplate, {
    //   width: '500px'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.isDialogedOpened = false;
    //   if (result) {
    //     this.usersService
    //       .awardMedals(this.selectedUser)
    //       .then(response => {
    //         this.selectedUser = null;
    //         this.search(false);
    //       })
    //       .catch(response => {
    //         this.openAwardUserMedalDialog();
    //       });
    //   }
    // });
  }
}
