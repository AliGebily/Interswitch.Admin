import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

import { Error404Component } from "./components/404/error-404.component";

const routes = [
  {
    path: "errors/404",
    component: Error404Component
  }
];

@NgModule({
  declarations: [Error404Component],
  imports: [RouterModule.forChild(routes), FuseSharedModule],
  exports: [Error404Component]
})
export class ErrorsModule {}
