import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "environments/environment";

@Pipe({
  name: "imageSrc",
  pure: false
})
export class ImageSrcPipe implements PipeTransform {
  transform(url: any): any {
    return url ? environment.Image_ENDPOINT + url : "assets/images/No_Image_Available.png";
  }
}
