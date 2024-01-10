import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const billCommunitySponsor = dbSchema.table(
    'bill_community_sponsor',
    {
        billCommunitySponsorId: integer('bill_community_sponsor_id').primaryKey(),
        billDetailsId: integer('bill_details_id'),
        communityOrgId: integer('community_org_id'),
    }
)

export type BillCommunitySponsor = InferSelectModel<typeof billCommunitySponsor>;
export type NewBillCommunitySponsor = InferInsertModel<typeof billCommunitySponsor>;