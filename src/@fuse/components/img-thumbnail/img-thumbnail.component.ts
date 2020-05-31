import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FuseConfigService } from '@fuse/services/config.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'img-thumbnail',
  templateUrl: './img-thumbnail.component.html',
  styleUrls: ['./img-thumbnail.component.scss']
})
export class ImgThumbnailComponent implements OnInit {
  @Input('src') src: string = null;
  @Input('class') class: string = null; 
  constructor(private globalService: GlobalService) {}
  ngOnInit() {}
  previewImage() {
   this.globalService.onImagePreview.next(this.src)
  }
}
