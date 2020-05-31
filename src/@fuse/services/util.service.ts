import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { HttpHeaders } from '@angular/common/http';
import { EnumConstants } from './enum.constants';
@Injectable()
export class UtilService {
  constructor(private snackBar: MatSnackBar) {}
  // yyyyMMdd
  formatDate(date: Date): string {
    var day = date.getDate().toString();
    if (day.length == 1) {
      day = '0' + day;
    }
    var month = (date.getMonth() + 1).toString();
    if (month.length == 1) {
      month = '0' + month;
    }
    var year = date.getFullYear().toString();

    return year + month + day;
  }

  parseDate(dateValue: string, includeTime?: Boolean): any {
    if (!dateValue) return null;
    if (dateValue.length < 8) throw new Error('invalid date format');
    let year = parseInt(dateValue.substring(0, 4));
    let month = parseInt(dateValue.substring(4, 6));
    let day = parseInt(dateValue.substring(6, 8));
    if (!includeTime) {
      return new Date(year, month - 1, day);
    }
    if (dateValue.length < 12) {
      throw new Error('invalid date-time format');
    }
    let hours = parseInt(dateValue.substring(8, 10));
    let minutes = parseInt(dateValue.substring(10, 12));

    return new Date(year, month - 1, day, hours, minutes, 0, 0);
  }
  monthsNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June ',
    'July ',
    'August',
    'September ',
    'October',
    'November',
    'December'
  ];
  getMonthName(monthIndex: number) {
    return this.monthsNames[monthIndex];
  }

  NewGuid() {
    var sGuid = '';
    for (var i = 0; i < 32; i++) {
      sGuid += Math.floor(Math.random() * 0xf).toString(0xf);
    }
    return sGuid;
  }
  getRequestClientReferenceNumber(): HttpHeaders {
    let headers = new HttpHeaders();
    return headers.append('Request-Client-Reference-Number', this.NewGuid());
  }
  showSuccessMessage(message) {
    this.snackBar.open(message, 'Close', {
      duration: 1000,
      verticalPosition: 'top',
      extraClasses: 'success-message'
    });
  }

  setPagination(criteria) {
    criteria = criteria || {};
    criteria.offset = criteria.offset || 0;
    criteria.limit = criteria.limit || environment.DEFUALT_LIMIT;
    criteria.sortBy = criteria.sortBy || 'Id';
    criteria.sortType = criteria.sortType || EnumConstants.Sort_direction.Desc;

    return criteria;
  }
}
