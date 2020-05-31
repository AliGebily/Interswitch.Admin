import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

import { UsersComponent } from './components/users/users.component';
import { UserAwardedMedalsComponent } from './components/user-awarded-medals/user-awarded-medals.component';
import { UsersService } from './users.service';

const routes = [
  {
    path: 'user-awarded-medals',
    component: UserAwardedMedalsComponent,
    resolve: {
      data: UsersService
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    resolve: {
      data: UsersService
    }
  }
];

@NgModule({
  declarations: [UserAwardedMedalsComponent, UsersComponent],
  imports: [RouterModule.forChild(routes), FuseSharedModule],
  exports: [UserAwardedMedalsComponent, UsersComponent],
  providers: [UsersService]
})
export class UsersModule {}
