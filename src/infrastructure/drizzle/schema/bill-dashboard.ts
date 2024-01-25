import {
    type InferInsertModel,
    type InferSelectModel
  } from 'drizzle-orm';
  
  import {
    integer,
    text,
    boolean
  } from 'drizzle-orm/pg-core';
import { dbSchema } from '../config';
export const billDashboard = dbSchema.table(
    'bill_dashboard',
    {
        billDashboardId: integer('bill_dashboard_id').primaryKey(),
        dashboardId: integer('dashboard_id'),
        billId: integer('bill_id'),
        hidden: boolean('hidden'),
    }
)

export type BillDashboard = InferSelectModel<typeof billDashboard>;
export type NewBillDashboard = InferInsertModel<typeof billDashboard>;