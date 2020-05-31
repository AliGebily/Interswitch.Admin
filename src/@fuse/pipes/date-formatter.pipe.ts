import { Pipe, PipeTransform } from '@angular/core';
import { StaticLookups } from '../../app/main/content/lookups/static-lookups';
@Pipe({
  name: 'dateFormatter',
  pure: false
})
export class DateFormatterPipe implements PipeTransform {
  //2018-10-29 11:17:09 AM
  transform(dateValue: string): any {
    return dateValue && dateValue.length > 0 ? dateValue.split(' ')[0] : '';
    // var parts = dateValue.split(' ');
    // var date = parts[0].split('-');
    // var dateObj=new Date(parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]))
  }
}
