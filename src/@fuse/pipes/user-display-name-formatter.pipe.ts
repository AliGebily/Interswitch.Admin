import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'userDisplayNameFormatter',
  pure: false
})
export class UserDisplayNamePipe implements PipeTransform {
  transform(userProfile: any): any {
    if (!userProfile) {
      return '';
    }
    return userProfile.firstName + ' ' + userProfile.lastName;
    // return userProfile.userInfo == null
    //   ? userProfile.firstName + ' ' + userProfile.lastName
    //   : userProfile.userInfo.nickname;
  }
}
