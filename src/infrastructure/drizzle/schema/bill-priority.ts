import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const billPriority = dbSchema.table(
    'bill_priority',
    {
        billPriorityId: integer('bill_priority_id').primaryKey(),
        billDetailsId: integer('bill_details_id'),
        priorityId: integer('priority_id'),
    }
)

export type BillPriority = InferSelectModel<typeof billPriority>;
export type NewBillPriority = InferInsertModel<typeof BillPriority>;