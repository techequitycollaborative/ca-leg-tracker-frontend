import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const committee = dbSchema.table(
    'committee',
    {
        committeeId: integer('committee_id').primaryKey(),
        chamberId: integer('chamber_id'),
        name: text('name'),
        webpageLink: text('webpage_link'),
    }
)

export type Committee = InferSelectModel<typeof committee>;
export type NewCommittee = InferInsertModel<typeof committee>;