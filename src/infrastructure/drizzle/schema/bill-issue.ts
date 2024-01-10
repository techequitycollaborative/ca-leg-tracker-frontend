import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const billIssue = dbSchema.table(
    'bill_issue',
    {
        billIssueId: integer('bill_issue_id').primaryKey(),
        issueId: integer('issue_id'),
        billDetailsId: integer('bill_details_id'),
    }
)

export type BillIssue = InferSelectModel<typeof billIssue>;
export type NewBillIssue = InferInsertModel<typeof billIssue>;