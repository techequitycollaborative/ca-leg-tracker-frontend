import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const committeeAssignment = dbSchema.table(
    'committee_assignment',
    {
        committeeAssignmentId: integer('committee_assignment_id').primaryKey(),
        legislatorId: integer('legislator_id'),
        committeeId: integer('committee_id'),
        assignmentType: text('assignment_type'),
    }
)

export type CommitteeAssignment = InferSelectModel<typeof committeeAssignment>;
export type NewCommitteeAssignment = InferInsertModel<typeof committeeAssignment>;