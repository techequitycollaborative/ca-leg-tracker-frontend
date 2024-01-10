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
export const chamberSchedule = dbSchema.table(
    'chamber_schedule',
    {
        chamber_schedule_id: integer('schedule_id').primaryKey(),
        billId: integer('chamber_id'),
        eventDate: date('event_date'),
        description: text('description'),
        source: text('source'),
    }
)

export type ChamberSchedule = InferSelectModel<typeof chamberSchedule>;
export type NewChamberSchedule = InferInsertModel<typeof chamberSchedule>;