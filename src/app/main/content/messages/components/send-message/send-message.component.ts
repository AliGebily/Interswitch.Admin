import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource
} from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { MessagesService } from '../../messages.service';
import { LookupsService } from '../../../lookups/lookups.service';
import { StaticLookups } from '../../../lookups/static-lookups';
import { EnumConstants } from '@fuse/services/enum.constants';
import { UtilService } from '@fuse/services/util.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class SendMessageComponent implements OnInit {
  currentMessage: any = null;
  rejection_reason_code: number;
  rejection_comment: string;
  suspension_reason: string;
  profileExpanded: boolean = true;
  rejectionDetailsExpanded: boolean = false;
  vehiclesDataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  tripsDataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  bookingsDataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  vehiclesList: any[] = [];
  tripsSearchResult: any = { trips: [], length: 0 };
  bookingsSearchResult: any = { bookings: [], length: 0 };
  users: any[] = null;
  vehiclesDisplayedColumns = [
    'car',
    'rating',
    'publishing_status',
    'adding_date',
    'requests',
    'trips',
    'reviews'
  ];
  tripsDisplayedColumns = [
    'start',
    'end',
    'status',
    'car',
    'driver',
    'total_revenue',
    'confirmation_date'
  ];
  bookingsDisplayedColumns = [
    'start',
    'end',
    'status',
    'car',
    'driver',
    'expected_revenue',
    'booking_date'
  ];
  tripsCriteriaFilter = {
    offset: 0,
    limit: environment.DEFUALT_LIMIT,
    sortBy: 'StartDate',
    sortType: EnumConstants.Sort_direction.Asc
  };
  bookingsCriteriaFilter = {
    offset: 0,
    limit: environment.DEFUALT_LIMIT,
    sortBy: 'StartDate',
    sortType: EnumConstants.Sort_direction.Desc
  };
  @ViewChild('rejectDialogTemplate')
  rejectDialogTemplate: any;
  @ViewChild('deliverDialogTemplate')
  deliverDialogTemplate: any;
  @ViewChild('suspendDialogTemplate')
  suspendDialogTemplate: any;

  staticLookups = StaticLookups;
  constructor(
    private messagesService: MessagesService,
    private lookupsService: LookupsService,
    private utilService: UtilService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentMessage = this.messagesService.currentMessage;
    this.users = this.lookupsService.users;
    this.profileExpanded = !(
      this.currentMessage.status == EnumConstants.Message_status.DELIVERED
    );
    this.rejectionDetailsExpanded =
      this.currentMessage.status == EnumConstants.Message_status.REJECTED;
    if (this.currentMessage.status == EnumConstants.Message_status.DELIVERED) {
      this.loadActivities({ tab: { textLabel: 'Listed Cars' } });
    }
  }
  loadActivities($event) {
    if ($event.tab.textLabel == 'Listed Cars') {
      if (!this.vehiclesList || this.vehiclesList.length == 0) {
        this.messagesService
          .getMessageVehicles(this.currentMessage.user_id)
          .then(response => {
            this.vehiclesDataSource = new MatTableDataSource(response);
            this.vehiclesList = response;
          });
      }
    } else if ($event.tab.textLabel == 'Trips') {
      this.searchTrips();
    } else if ($event.tab.textLabel == 'Requests') {
      this.searchBookings();
    } else {
    }
  }
  deliver() {
    this.messagesService
      .deliverMessage(this.currentMessage.user_id)
      .then(() => {
        this.utilService.showSuccessMessage(
          'User Message delivered successfully'
        );
        this.messagesService
          .getMessage(this.currentMessage.user_id)
          .then(response => {
            this.currentMessage = response;
          });
      });
  }
  openDeliverDialog(): void {
    let dialogRef = this.dialog.open(this.deliverDialogTemplate, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deliver();
      }
    });
  }
  openRejectDialog(): void {
    let dialogRef = this.dialog.open(this.rejectDialogTemplate, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reject();
      }
      this.rejection_reason_code = null;
      this.rejection_comment = null;
    });
  }
  reject() {
    this.messagesService
      .rejectMessage(this.currentMessage.user_id, {
        rejection_reason_code: this.rejection_reason_code,
        comment: this.rejection_comment
      })
      .then(() => {
        this.utilService.showSuccessMessage(
          'User Message REJECTED successfully'
        );
        this.messagesService
          .getMessage(this.currentMessage.user_id)
          .then(response => {
            this.currentMessage = response;
          });
      });
  }
  activateAccount() {
    this.messagesService
      .readMessage(this.currentMessage.user_id)
      .then(() => {
        this.utilService.showSuccessMessage(
          'User Message activated successfully'
        );
        this.messagesService
          .getMessage(this.currentMessage.user_id)
          .then(response => {
            this.currentMessage = response;
          });
      });
  }
  openSuspendDialog(): void {
    let dialogRef = this.dialog.open(this.suspendDialogTemplate, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.suspendAccount();
      }
      this.suspension_reason = null;
    });
  }
  suspendAccount() {
    this.messagesService
      .suspendMessage(this.currentMessage.user_id, this.suspension_reason)
      .then(() => {
        this.utilService.showSuccessMessage(
          'User Message suspended successfully'
        );
        this.messagesService
          .getMessage(this.currentMessage.user_id)
          .then(response => {
            this.currentMessage = response;
          });
      });
  }
  tripsPaginationChanged($event) {
    this.tripsCriteriaFilter.offset = $event.pageIndex;
    this.tripsCriteriaFilter.limit = $event.pageSize;
    this.searchTrips();
  }
  bookingsPaginationChanged($event) {
    this.bookingsCriteriaFilter.offset = $event.pageIndex;
    this.bookingsCriteriaFilter.limit = $event.pageSize;
    this.searchBookings();
  }
  sortTripsData($event) {
    this.tripsCriteriaFilter.sortBy = $event.active;
    this.tripsCriteriaFilter.sortType =
      $event.direction.toUpperCase() == 'DESC'
        ? EnumConstants.Sort_direction.Desc
        : EnumConstants.Sort_direction.Asc;
    this.tripsCriteriaFilter.offset = 0;
    this.searchTrips();
  }
  sortBookingsData($event) {
    this.bookingsCriteriaFilter.sortBy = $event.active;
    this.bookingsCriteriaFilter.sortType =
      $event.direction.toUpperCase() == 'DESC'
        ? EnumConstants.Sort_direction.Desc
        : EnumConstants.Sort_direction.Asc;
    this.bookingsCriteriaFilter.offset = 0;
    this.searchBookings();
  }
  searchTrips() {
    let criteria = JSON.parse(JSON.stringify(this.tripsCriteriaFilter));
    if (criteria.vehicle_codes) {
      criteria.vehicle_codes = [criteria.vehicle_codes];
    }
    this.messagesService
      .getMessageTrips(this.currentMessage.user_id, criteria)
      .then(response => {
        this.tripsDataSource = new MatTableDataSource(response.trips);
        this.tripsSearchResult = response;
      });
  }
  searchBookings() {
    let criteria = JSON.parse(JSON.stringify(this.bookingsCriteriaFilter));
    if (criteria.vehicle_codes) {
      criteria.vehicle_codes = [criteria.vehicle_codes];
    }
    this.messagesService
      .getMessageBookings(this.currentMessage.user_id, criteria)
      .then(response => {
        this.bookingsDataSource = new MatTableDataSource(response.bookings);
        this.bookingsSearchResult = response;
      });
  }
}
