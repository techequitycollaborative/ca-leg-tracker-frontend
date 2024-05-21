import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const priorityTier = dbSchema.table(
    'priority_tier',
    {
        priorityId: integer('priority_id').primaryKey(),
        priorityDescription: text('priority_description'),
    }
)

export type PriorityTier = InferSelectModel<typeof priorityTier>;
export type NewPriorityTier = InferInsertModel<typeof priorityTier>;