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
export const billHistory = dbSchema.table(
    'bill_history',
    {
        billHistoryId: integer('bill_history_id').primaryKey(),
        billId: integer('bill_id'),
        eventDate: date('event_date'),
        eventText: text('event_text'),
    }
)

export type BillHistory = InferSelectModel<typeof billHistory>;
export type NewBillHistory = InferInsertModel<typeof billHistory>;