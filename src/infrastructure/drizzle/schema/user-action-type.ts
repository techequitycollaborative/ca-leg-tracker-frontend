import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const userActionType = dbSchema.table(
    'user_action_type',
    {
        userActionTypeId: integer('user_action_type_id').primaryKey(),
        userActionTypeName: text('user_action_type_name'),
    }
)

export type UserActionType = InferSelectModel<typeof userActionType>;
export type NewUserActionType = InferInsertModel<typeof userActionType>;