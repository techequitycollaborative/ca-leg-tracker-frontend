import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const orgPosition = dbSchema.table(
    'org_position',
    {
        orgPositionId: integer('org_position_id').primaryKey(),
        orgPositionName: text('org_position_name'),
    }
)

export type OrgPosition = InferSelectModel<typeof orgPosition>;
export type NewOrgPosition = InferInsertModel<typeof orgPosition>;