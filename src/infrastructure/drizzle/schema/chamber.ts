import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const chamber = dbSchema.table(
    'chamber',
    {
        chamberId: integer('chamber_id').primaryKey(),
        name: text('name'),
    }
)

export type Chamber = InferSelectModel<typeof chamber>;
export type NewChamber = InferInsertModel<typeof chamber>;