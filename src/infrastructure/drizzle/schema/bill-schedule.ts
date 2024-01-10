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
export const billSchedule = dbSchema.table(
    'bill_schedule',
    {
        billScheduleId: integer('bill_schedule_id').primaryKey(),
        billId: integer('bill_id'),
        eventDate: date('event_date'),
        eventText: text('event_text'),
    }
)

export type BillSchedule = InferSelectModel<typeof billSchedule>;
export type NewBillSchedule = InferInsertModel<typeof billSchedule>;