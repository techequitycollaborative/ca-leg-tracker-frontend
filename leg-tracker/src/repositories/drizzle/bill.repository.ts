import { bill } from "@/infrastructure/drizzle/schema/bill";
import { BaseRepository } from "./base.repository";
import { IBill, IBillRepository } from "definitions/bill.repository";
import { db } from "@/infrastructure/drizzle";

  
  export class BillRepository
    extends BaseRepository<IBill>
    implements IBillRepository
  {
    constructor() {
      super(bill, 'billId');
    }
    public async test(){
        const q = await db.select().from(bill);
        console.log(q);
    }
  }