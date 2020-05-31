export const navigation = [
  {
    id: 'adminMessages',
    title: 'Admin Messages',
    type: 'collapse',
    icon: 'account_circle',
    children: [
      {
        id: 'inboxMessages',
        title: 'Inbox',
        type: 'item',
        icon: 'inbox',
        url: '/messages/inbox'
      },
      {
        id: 'sentMessages',
        title: 'Sent',
        type: 'item',
        icon: 'message',
        url: '/messages/sent'
      }
    ]
  },
  // {
  //   id: 'appMessages',
  //   title: 'App Messages',
  //   type: 'item',
  //   icon: 'account_box',
  //   url: '/messages/app'
  // },
  {
    id: 'users',
    title: 'Users',
    type: 'item',
    icon: 'account_circle',
    url: '/users'
  },
  {
    id: 'medals',
    title: 'Medals',
    type: 'item',
    icon: 'work',
    url: '/user-awarded-medals'
  }
];
