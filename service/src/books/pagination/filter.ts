import { ILike } from 'typeorm';

export interface Filter {
  property: string;
  value: string | undefined;
}

export function createFilterWhereClause(filters: Filter[]) {
  return filters
    .filter((filter) => filter.value)
    .map((filter) => ({ [filter.property]: ILike(`%${filter.value}%`) }))
    .reduce((accumulator, current) => Object.assign(accumulator, current), {});
}
