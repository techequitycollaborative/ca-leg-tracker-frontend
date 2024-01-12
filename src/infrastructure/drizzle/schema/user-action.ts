import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text,
    date
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const userAction = dbSchema.table(
    'user_action',
    {
        userActionId: integer('user_action_id').primaryKey(),
        billDashboardId: integer('bill_dashboard_id'),
        userId: integer('user_id'), 
        date: date('date'),
        actionType: text('action_type'),
    }
)

export type UserAction = InferSelectModel<typeof userAction>;
export type NewUserAction = InferInsertModel<typeof userAction>;