import { BillRepository } from "./drizzle/bill.repository";
import { LegislatorRepository } from "./drizzle/legislator.repository";


export const repositories = {
    billRepository: new BillRepository(),
    legislatorRepository: new LegislatorRepository()
}