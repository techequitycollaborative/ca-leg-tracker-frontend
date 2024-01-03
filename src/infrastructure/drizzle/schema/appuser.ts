import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const appuser = dbSchema.table(
    'app_user',
    {
        userId: integer('user_id').primaryKey(),
        userName: text('user_name'),

    }
)

  export type AppUser = InferSelectModel<typeof appuser>;
  export type NewAppUser = InferInsertModel<typeof appuser>;