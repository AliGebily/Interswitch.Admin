import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FuseConfigService } from '@fuse/services/config.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.scss']
})
export class CustomCalendarComponent implements OnInit {
  @Input('schedule') schedule: any[any] = null;
  selectedMonth: any = null;
  days: any = [];
  constructor(private utilService: UtilService) {}
  ngOnInit() {
    if (this.schedule) {
      this.schedule = JSON.parse(JSON.stringify(this.schedule));
      this.schedule.forEach(interval => {
        interval.from_date = this.utilService.parseDate(interval.from_date);
        interval.to_date = this.utilService.parseDate(interval.to_date);
      });
    }
    this.selectMonth(new Date());
  }
  private isActive(date: Date): Boolean {
    return (
      this.schedule.findIndex(interval => {
        return date >= interval.from_date && date <= interval.to_date;
      }) != -1
    );
  }
  private selectMonth(date: Date) {
    this.selectedMonth = {
      date: date,
      monthName: this.utilService.getMonthName(date.getMonth()),
      year: date.getFullYear()
    };
    this.days = [];
    let tempDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      1 //date.getDate()
    );
    let nextMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      1 //date.getDate()
    );
    // while (tempDate.getDay() != 0 || tempDate.getMonth() == date.getMonth()) {
    //   tempDate.setDate(tempDate.getDate() - 1);
    // }
    let skippedDays = tempDate.getDay();
    for (let index = 0; index < skippedDays; index++) {
      this.days.push({
        sequence: '',
        isActive: this.isActive(tempDate)
      });
    }
    let index = 0;
    while (tempDate < nextMonth) {
      this.days.push({
        sequence: tempDate.getDate(),
        isActive: this.isActive(tempDate)
      });
      tempDate.setDate(tempDate.getDate() + 1);
      index++;
      if (index > 100) {
        console.log(tempDate, date);
        break;
      }
    }
    // while (tempDate.getDay() < 6) {
    //   this.days.push({
    //     sequence: tempDate.getDate(),
    //     isActive: this.isActive(tempDate)
    //   });
    //   tempDate.setDate(tempDate.getDate() + 1);
    // }

    // this.days.push({
    //   sequence: tempDate.getDate(),
    //   isActive: this.isActive(tempDate)
    // });
  }
  goMonth(monthIncrease) {
    this.selectedMonth.date.setMonth(
      this.selectedMonth.date.getMonth() + monthIncrease
    );
    this.selectMonth(this.selectedMonth.date);
  }
  goPreviousMonth() {
    this.goMonth(-1);
  }
  goNextMonth() {
    this.goMonth(1);
  }
}
