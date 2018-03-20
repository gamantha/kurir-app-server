export const RECEIVER_RESPONSE_STRUCTURE = [
  'id',
  'name',
  'address',
  'phone',
  'city',
  'updatedAt',
  'createdAt',
];

export const GET_ITEM_RESPONSE_STRUCTURE = [
  'Courier',
  'Receiver',
  'ReceiverId',
  'Sender',
  'address',
  'category',
  'city',
  'cost',
  'country',
  'courierId',
  'createdAt',
  'from',
  'id',
  'name',
  'note',
  'reward',
  'senderId',
  'status',
  'ticketNumber',
  'to',
  'type',
  'updatedAt',
  'weight',
];

export const CREATE_ITEM_RESPONSE_STRUCTURE = [
  'id',
  // 'ticketNumber',
  // 'courierId',
  'senderId',
  'category',
  'ReceiverId',
  'from',
  'to',
  'country',
  'city',
  'address',
  'type',
  'weight',
  'name',
  'cost',
  'reward',
  'note',
  'status',
  'updatedAt',
  'createdAt',
];

export const SENDER_ITEM_RESPONSE_STRUCTURE = [
  'id',
  'UserId',
  'city',
  'name',
  'address',
  'phone',
  'createdAt',
  'updatedAt',
  'User',
];

export const USER_ITEM_RESPONSE_STRUCTURE = [
  'username',
  'role',
  'photoLink',
  'isEmailValidated',
  'email',
  'deletedAt',
];

export const UPDATE_PROPOSAL_RESPONSE_STRUCTURE = ['UserId', 'updated'];

export const GET_PROPOSAL_RESPONSE_STRUCTURE = [
  'User',
  'UserId',
  'acceptDate',
  'createdAt',
  'id',
  'idLink',
  'photoLink',
  'proposeDate',
  'rejectDate',
  'rejectReason',
  'status',
  'updatedAt',
];

export const EDIT_PROFILE_RESPONSE_STRUCTURE = ['user', 'sender'];

export const EDIT_ITEM_RESPONSE_STRUCTURE = ['item'];
