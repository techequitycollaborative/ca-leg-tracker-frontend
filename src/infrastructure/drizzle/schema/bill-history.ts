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
        entryDate: date('entry_date'),
        entryText: text('entry_text'),
    }
)

export type BillHistory = InferSelectModel<typeof billHistory>;
export type NewBillHistory = InferInsertModel<typeof billHistory>;