export const StaticLookups = {
WeekDaysEnum:[
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
],
  VerificationStatusesEnum: [
    'Not-PENDING',
    'PENDING',
    'DELIVERED',
    'REJECTED',
    'Expired',
    'Re-PENDING'
  ],
  VerificationStatusesList: [
    {
      value: 0,
      text: 'Not PENDING'
    },
    {
      value: 1,
      text: 'PENDING'
    },

    {
      value: 2,
      text: 'DELIVERED'
    },

    {
      value: 3,
      text: 'REJECTED'
    },

    {
      value: 4,
      text: 'Expired'
    },

    {
      value: 5,
      text: 'Re-PENDING'
    }
  ],
  VerificationPendingStatusesList: [
    {
      value: 1,
      text: 'PENDING'
    },
    {
      value: 5,
      text: 'Re-PENDING'
    }
  ],
  SuspensionStatusesList: [
    {
      value: 0,
      text: 'Active'
    },

    {
      value: 1,
      text: 'Suspended'
    },

    {
      value: 2,
      text: 'Inactive'
    }
  ],
  VehicleSuspensionStatusesList: [
    {
      value: 0,
      text: 'Active'
    },

    {
      value: 1,
      text: 'Suspended'
    }
  ],
  VehiclePublishingStatusesList: [
    {
      value: 0,
      text: 'Un-Published'
    },

    {
      value: 1,
      text: 'Published'
    }
  ],
  TripStatusesEnum: [
    'Upcoming',
    'DriverInitiatedPickup',
    'MessageREJECTEDPickupInspection',
    'Ongoing',
    'Completed',
    'Missed',
    'Cancelled'
  ],
  TripStatusesList: [
    {
      value: 0,
      text: 'Upcoming'
    },

    {
      value: 1,
      text: 'DriverInitiatedPickup'
    },

    {
      value: 2,
      text: 'MessageREJECTEDPickupInspection'
    },

    {
      value: 3,
      text: 'Ongoing'
    },

    {
      value: 4,
      text: 'Completed'
    },

    {
      value: 5,
      text: 'Missed'
    },

    {
      value: 6,
      text: 'Cancelled'
    }
  ],
  BookingStatusesEnum: [
    'Pending',
    'Accepted',
    'REJECTED',
    'Confirmed',
    'Cancelled',
    'Expired',
    'Ended'
  ],
  BookingStatusesList: [
    {
      value: 0,
      text: 'Pending'
    },
    {
      value: 1,
      text: 'Accepted'
    },
    {
      value: 2,
      text: 'REJECTED'
    },
    {
      value: 3,
      text: 'Confirmed'
    },
    {
      value: 4,
      text: 'Cancelled'
    },
    {
      value: 5,
      text: 'Expired'
    },
    {
      value: 6,
      text: 'Ended'
    }
  ],
  BookingCancelledByEnum: [
    'Message',
    'Driver',
    'Admin',
    'AutoByAnotherBookingFromDriverAccepted',
    'AutoByAnotherBookingToMessageAccepted'
  ],
  BookingExpiredByEnum: [
    'MessageDidNotAcceptPendingRequest',
    'DriverDidnotPaidAcceptedRequest'
  ]
};
