import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const bill = dbSchema.table(
    'bill',
    {
        billId: integer('bill_id').primaryKey(),
        billName: text('bill_name'),
        billNumber: text('bill_number'),
        fullText: text('full_text'),
        author: text('author'),
        coauthors: text('coauthors'),
        originChamberId: integer('origin_chamber_id'),
        committeeId: integer('committee_id'),
        status: text('status'),
        leginfoLink: text('leginfo_link'),
        legSession: text('leg_session'),
    }
)

export type Bill = InferSelectModel<typeof bill>;
export type NewBill = InferInsertModel<typeof bill>;
export type PartialBill = Partial<Bill>;