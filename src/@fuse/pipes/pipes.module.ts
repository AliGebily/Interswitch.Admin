import { NgModule } from "@angular/core";

import { DateFormatterPipe } from "./date-formatter.pipe";
import { ImageSrcPipe } from "./image-src.pipe";
import { KeysPipe } from "./keys.pipe";
import { GetByIdPipe } from "./getById.pipe";
import { HtmlToPlaintextPipe } from "./htmlToPlaintext.pipe";
import { FilterPipe } from "./filter.pipe";
import { CamelCaseToDashPipe } from "./camelCaseToDash.pipe";
import { UserDisplayNamePipe } from "./user-display-name-formatter.pipe";

@NgModule({
  declarations: [
    ImageSrcPipe,
    DateFormatterPipe,
    UserDisplayNamePipe,
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe
  ],
  imports: [],
  exports: [
    ImageSrcPipe,
    DateFormatterPipe,
    UserDisplayNamePipe,
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe
  ]
})
export class FusePipesModule {}
