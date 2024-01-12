import { BillRepository } from "./drizzle/bill.repository";
import { LegislatorRepository } from "./drizzle/legislator.repository";
import { UserRepository } from "./drizzle/user.repository";


export const repositories = {
    billRepository: new BillRepository(),
    legislatorRepository: new LegislatorRepository(),
    userRepository: new UserRepository(),
}