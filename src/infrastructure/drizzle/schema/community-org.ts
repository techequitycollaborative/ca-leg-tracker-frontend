import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const communityOrg = dbSchema.table(
    'community_org',
    {
        communityOrgId: integer('community_org_id').primaryKey(),
        communityOrgName: text('community_org_name'),
    }
)

export type CommunityOrg = InferSelectModel<typeof communityOrg>;
export type NewCommunityOrg = InferInsertModel<typeof communityOrg>;