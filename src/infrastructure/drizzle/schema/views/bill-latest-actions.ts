import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text,
    date
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../../config';
export const billLatestActions = dbSchema.table(
    'bill_latest_actions',
    {
        billId: integer('bill_id'),
        dashboardId: integer('dashboard_id'),
        lastDate: date('last_date'),
        lastText: text('last_text'),
        nextDate: date('next_date'),
        nextText: text('next_text'),
        userDate: date('user_date'),
        userText: text('user_text'),
    }
)

export type BillLatestActions = InferSelectModel<typeof billLatestActions>;
export type NewBillLatestActions = InferInsertModel<typeof billLatestActions>;