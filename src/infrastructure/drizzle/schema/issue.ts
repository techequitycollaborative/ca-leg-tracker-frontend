import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const issue = dbSchema.table(
    'issue',
    {
        issueId: integer('issue_id').primaryKey(),
        issueName: text('issue_name'),
    }
)

export type Issue = InferSelectModel<typeof issue>;
export type NewIssue = InferInsertModel<typeof issue>;