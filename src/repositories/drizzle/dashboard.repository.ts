import { dashboard } from "@/infrastructure/drizzle/schema/dashboard";
import { BaseRepository } from "./base.repository";
import { IDashboard, IDashboardRepository } from "definitions/dashboard.repository";
import { db } from "@/infrastructure/drizzle";

  
  export class DashboardRepository
    extends BaseRepository<IDashboard>
    implements IDashboardRepository
  {
    constructor() {
      super(dashboard, 'dashboardId');
    }
    
  }