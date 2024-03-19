import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const user = dbSchema.table(
    'app_user',
    {
        userId: integer('user_id').primaryKey(),
        userName: text('user_name'),
        userAccessLevel: text('user_access_level'),
    }
)

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;