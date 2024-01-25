import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const userActionStatus = dbSchema.table(
    'user_action_status',
    {
        userActionStatusId: integer('user_action_status_id').primaryKey(),
        userActionStatusName: text('user_action_status_name'),
    }
)

export type UserActionStatus = InferSelectModel<typeof userActionStatus>;
export type NewUserActionStatus = InferInsertModel<typeof userActionStatus>;