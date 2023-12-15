import { db } from "@/infrastructure/drizzle";
import { IBaseRepository, ListParams } from "definitions/base.repository";
import { PgTable } from 'drizzle-orm/pg-core';
import { asc, desc, sql } from 'drizzle-orm';

export  class BaseRepository<T> implements IBaseRepository<T> {
    table: PgTable;
    primaryKey: string;
    constructor(
        table: PgTable,
        primaryKey: any,
      ) {
        this.table = table;
        this.primaryKey = primaryKey;
      }
      async getById(primaryKey: string | number): Promise<T | null> {
        const item = (await db
          .select()
          .from(this.table)
          // @ts-ignore
          .where(sql`${this.table[this.primaryKey]} = ${primaryKey}`)
          .catch((e) => {
            console.log(e);
            return null;
          })) as T[] | null;
        if (!item || !item.length || item.length <= 0) return null;
        return item[0];
      }

      public async list(params: ListParams): Promise<T[] | null> {
        const pageSize = params?.limit || 20;

        const itemsData = (await db
            .select()
            .from(this.table)
            .limit(pageSize)
            .catch((e) => {
              console.log(e);
            })) as T[] | null;

          console.log("HELLO");
          console.log(itemsData);

          if (!itemsData || itemsData.length < 1) {
            return null;
          }
          return itemsData
      }
      
}