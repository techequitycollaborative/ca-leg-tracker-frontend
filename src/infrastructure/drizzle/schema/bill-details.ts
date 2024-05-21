import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const billDetails = dbSchema.table(
    'bill_details',
    {
        billDetailsId: integer('bill_details_id').primaryKey(),
        billDashboardId: integer('bill_dashboard_id'),
        alternateName: text('alternate_name'),
        assignedUserId: integer('assigned_user_id'),
        orgPositionId: integer('org_position_id'),
        communitySponsor: text('community_sponsor'),
        coalition: text('coalition'),
        politicalIntel: text('political_intel'),
        policyNotes: text('policy_notes'),

    }
)

export type BillDetails = InferSelectModel<typeof billDetails>;
export type NewBillDetails = InferInsertModel<typeof billDetails>;