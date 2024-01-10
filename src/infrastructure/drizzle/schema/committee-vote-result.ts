import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text,
    date
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const committeeVoteResult = dbSchema.table(
    'committee_vote_result',
    {
        committeeVoteResultId: integer('committee_vote_result_id').primaryKey(),
        voteDate: date('vote_date'),
        billId: integer('bill_id'),
        committeeId: integer('committee_id'),
        votesFor: integer('votes_for'),
        votesAgainst: integer('votes_against'),
    }
)

export type CommmitteeVoteResult = InferSelectModel<typeof committeeVoteResult>;
export type NewCommmitteeVoteResult = InferInsertModel<typeof committeeVoteResult>;