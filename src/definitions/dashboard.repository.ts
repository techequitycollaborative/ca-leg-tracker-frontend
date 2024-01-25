import { Dashboard } from "@/infrastructure/drizzle/schema/dashboard";
import { IBaseRepository } from "./base.repository";

export interface IDashboard extends Dashboard {}

export interface IDashboardRepository extends IBaseRepository<IDashboard> {}