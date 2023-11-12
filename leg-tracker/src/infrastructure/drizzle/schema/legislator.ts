import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const legislator = dbSchema.table(
    'legislator',
    {
      legislatorId: integer('legislator_id').primaryKey(),
        chamberId: integer('chamber_id'),
        name: text('name'), 
        district: integer('district'),
        party: text('party'), 
      
    }
)

  export type Legislator = InferSelectModel<typeof legislator>;
  export type NewLegislator = InferInsertModel<typeof legislator>;
