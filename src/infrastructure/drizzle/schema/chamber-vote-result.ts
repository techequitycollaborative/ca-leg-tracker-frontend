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
export const chamberVoteResult = dbSchema.table(
    'chamber_vote_result',
    {
        chamberVoteResultId: integer('chamber_vote_result_id').primaryKey(),
        voteDate: date('vote_date'),
        billId: integer('bill_id'),
        chamberId: integer('chamber_id'),
        votesFor: integer('votes_for'),
        votesAgainst: integer('votes_against'),
        votesOther: integer('votes_other'),
    }
)

export type ChamberVoteResult = InferSelectModel<typeof chamberVoteResult>;
export type NewChamberVoteResult = InferInsertModel<typeof chamberVoteResult>;