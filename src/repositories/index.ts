import { BillRepository } from "./drizzle/bill.repository";
import { LegislatorRepository } from "./drizzle/legislator.repository";
import { AppUserRepository } from "./drizzle/appuser.repository";


export const repositories = {
    billRepository: new BillRepository(),
    legislatorRepository: new LegislatorRepository(),
    appUserRepository: new AppUserRepository(),
}