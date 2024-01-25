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
        dueDate: date('due_date'),
        userActionTypeId: integer('user_action_type_id'),
        userActionStatusId: integer('user_action_status_id'),
        legislatorId: integer('legislator_id'),
        committeeId: integer('committee_id'),
        link: text('link'),
        notes: text('notes'),
    }
)

export type UserAction = InferSelectModel<typeof userAction>;
export type NewUserAction = InferInsertModel<typeof userAction>;