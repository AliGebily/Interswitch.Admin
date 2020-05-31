import { NgModule } from "@angular/core"; 
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";

import { InboxMessagesComponent } from "./components/inbox-messages/inbox-messages.component";
import { SentMessagesComponent } from "./components/sent-messages/sent-messages.component";
import { AppMessagesComponent } from "./components/app-messages/app-messages.component";
import { SendMessageComponent } from "./components/send-message/send-message.component";
import { MessagesService } from "./messages.service";

const routes = [
  {
    path: "messages/inbox",
    component: InboxMessagesComponent,
    resolve: {
      data: MessagesService
    }
  },
  {
    path: "messages/sent",
    component: SentMessagesComponent,
    resolve: {
      data: MessagesService
    }
  }, {
    path: "messages/send",
    component: SendMessageComponent,
    resolve: {
      data: MessagesService
    }
  },
  {
    path: "messages/app",
    component: AppMessagesComponent,
    resolve: {
      data: MessagesService
    }
  }
];

@NgModule({
  declarations: [InboxMessagesComponent, SentMessagesComponent, AppMessagesComponent, SendMessageComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule
  ],
  exports: [InboxMessagesComponent, SentMessagesComponent, AppMessagesComponent, SendMessageComponent],
  providers: [MessagesService]
})
export class MessagesModule {}
