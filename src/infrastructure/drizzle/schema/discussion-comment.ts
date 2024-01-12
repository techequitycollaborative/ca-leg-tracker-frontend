import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text,
    timestamp
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const discussionComment = dbSchema.table(
    'discussion_comment',
    {
        discussionCommentId: integer('discussion_comment_id').primaryKey(),
        billDashboardId: text('bill_dashboard_id'),
        userId: integer('user_id'), 
        commentDatetime: timestamp('comment_datetime'),
        commentText: text('comment_text'),
    }
)

export type DiscussionComment = InferSelectModel<typeof discussionComment>;
export type NewDiscussionComment = InferInsertModel<typeof discussionComment>;