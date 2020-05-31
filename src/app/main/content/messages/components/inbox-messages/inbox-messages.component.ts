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

import { MessagesService } from '../../messages.service';
import { LookupsService } from '../../../lookups/lookups.service';
import { StaticLookups } from '../../../lookups/static-lookups';

import { environment } from 'environments/environment';
import { UtilService } from '@fuse/services/util.service';
import { EnumConstants } from '@fuse/services/enum.constants';

@Component({
  selector: 'app-inbox-messages',
  templateUrl: './inbox-messages.component.html',
  styleUrls: ['./inbox-messages.component.scss'],
  animations: fuseAnimations
})
export class InboxMessagesComponent implements OnInit {
  messagesSearchResult: any;
  users: any[];

  @ViewChild('searchPanel')
  searchPanel: any;
  //filter

  criteriaFilter: any = {};

  messagesDataSource: MatTableDataSource<any>;
  displayedColumns = ['title', 'body', 'date', 'status', 'actions'];
  pageTitle: string = 'Admin Inbox';

  messageStatus = ['NEW', 'READ'];
  staticLookups = StaticLookups;

  @ViewChild('viewMessageDialogTemplate')
  viewMessageDialogTemplate: any;

  @ViewChild('deleteMessageDialogTemplate')
  deleteMessageDialogTemplate: any;
  selectedMessage: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService,
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
    this.messagesSearchResult = this.messagesService.messagesSearchResult;
    this.users = this.lookupsService.users;
    this.messagesDataSource = new MatTableDataSource(
      this.messagesSearchResult.notifications
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
      userId: null,
      status: null
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

    this.messagesService.getInboxMessages(searchCriteria).then(
      messagesSearchResultResponse => {
        this.messagesSearchResult = messagesSearchResultResponse;
        this.messagesDataSource = new MatTableDataSource(
          this.messagesSearchResult.notifications
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
  viewMessage(message) {
    if (this.isDialogedOpened) {
      return;
    }
    if (this.selectedMessage == message) {
      this.selectedMessage = null;
      return;
    }
    this.selectedMessage = message;
    this.isDialogedOpened = true;

    if (message.status == 'NEW') {
      this.messagesService.readMessage(message.id).then(response => {
        this.search(false);
      });
    }
    let dialogRef = this.dialog.open(this.viewMessageDialogTemplate, {
      width: '500px'
    });
    this.selectedMessage = message;
    dialogRef.afterClosed().subscribe(result => {
      this.selectedMessage = null;
      this.isDialogedOpened = false;
    });
  }
  openDeleteMessageDialog(message): void {
    this.selectedMessage = message;
    this.isDialogedOpened = true;
    let dialogRef = this.dialog.open(this.deleteMessageDialogTemplate, {
      width: '500px'
    });
    this.selectedMessage = message;
    dialogRef.afterClosed().subscribe(result => {
      this.selectedMessage = null;
      this.isDialogedOpened = false;
      if (result) {
        this.messagesService
          .deleteMessage(message.id, 'INBOX')
          .then(response => {
            this.search(false);
          });
      }
    });
  }
}
