export const EnumConstants = {
  Message_status: {
    NEW: 'NEW',
    READ: 'READ',
    PENDING: 'PENDING',
    DELIVERED: 'DELIVERED',
    REJECTED: 'REJECTED'
  },
  Suspension_status: {
    Active: 0,

    Suspended: 1,

    Inactive: 2
  },
  Sort_direction: {
    Desc:"DESC",
    Asc: "ASC"
  },

  vehicle_view: {
    Interior: 0,

    Exterior: 1
  },

  Transmission_type: {
    Automatic: 0,

    Manual: 1
  },

  Booking_status: {
    Pending: 0,

    Accepted: 1,

    REJECTED: 2,

    Confirmed: 3,

    Cancelled: 4,

    Expired: 5
  },

  Trip_status: {
    Not_started: 0,

    Ongoing: 1,

    Completed: 2,

    Missed: 3,

    Cancelled: 4
  },
  Rejection_reason: {
    Fake: 0,
    Unclear: 1,
    Incorrect: 2
  },
  Payout_type: {
    Bank_account: 0,
    Fawry: 1
  },
  Publishing_status: {
    UnPublished: 0,
    Published: 1
  }
};
