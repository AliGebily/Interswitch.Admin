import { Component, EventEmitter, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { FuseConfigService } from "@fuse/services/config.service";

@Component({
  selector: "rating-item",
  templateUrl: "./rating-item.component.html",
  styleUrls: ["./rating-item.component.scss"]
})
export class RatingItemComponent implements OnInit{
  @Input("value") value: number = null;

  constructor() {
    
  }
  ngOnInit(){
  }
}
