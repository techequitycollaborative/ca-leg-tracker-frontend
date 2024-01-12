import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const dashboard = dbSchema.table(
    'dashboard',
    {
        dashboardId: integer('dashboard_id').primaryKey(),
        dashboardName: text('dashboard_name'),
    }
)

export type Dashboard = InferSelectModel<typeof dashboard>;
export type NewDashboard = InferInsertModel<typeof dashboard>;