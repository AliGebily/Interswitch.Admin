import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RatingItemComponent } from './rating-item.component';

@NgModule({
    declarations: [
        RatingItemComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        RatingItemComponent
    ]
})
export class RatingItemModule
{
}
