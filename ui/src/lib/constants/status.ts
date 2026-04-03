const STATUS = {
  STATUS_FIELD_IDENTIFIER: 'status',
} as const;

export type StatusField = keyof typeof STATUS.STATUS_FIELD_IDENTIFIER;

export default STATUS;
