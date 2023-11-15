export interface IBaseRepository<T> {
    getById(primaryKey: string | number): Promise<T | null>;
    list(params: ListParams): Promise<T[] | null>;
  
  }

  export enum OrderDirection {
    asc = 'ASC',
    desc = 'DESC'
  }

  export interface ListParams {
    offset?: string;
    limit?: number;
    order?: OrderDirection;
    sortByAttribute?: string;
  }