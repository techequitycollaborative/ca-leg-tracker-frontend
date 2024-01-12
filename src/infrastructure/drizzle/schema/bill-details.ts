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
        policyNotes: text('policy_notes'),
        orgPositionId: integer('org_position_id'),
        politicalIntel: text('political_intel'),
        assignedUserId: integer('assigned_user_id'),
    }
)

export type BillDetails = InferSelectModel<typeof billDetails>;
export type NewBillDetails = InferInsertModel<typeof billDetails>;