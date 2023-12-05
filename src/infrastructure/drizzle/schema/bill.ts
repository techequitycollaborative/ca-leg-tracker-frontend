import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
console.log(dbSchema);
export const bill = dbSchema.table(
    'bill',
    {
        billId: integer('bill_id').primaryKey(),
        billName: text('bill_name'),
        billNumber: text('bill_number'), 
        userName: text('user_name'),
        fullText: text('full_text'), 
        author: text('author'),
        originChamberId: integer('origin_chamber_id'),
        committeeId: integer('committee_id'),
        status: text('status'), 

    }
)

  export type Bill = InferSelectModel<typeof bill>;
  export type NewBill = InferInsertModel<typeof bill>;
  export type PartialBill = Partial<Bill>;