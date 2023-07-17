export interface PaginationMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationLinks {
  first: string;
  last: string;
  previous?: string;
  next?: string;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

export function createPaginationResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginationResponse<T> {
  const last = Math.ceil(total / limit);
  const next = page + 1 > last ? undefined : page + 1;
  const previous = page - 1 < 1 ? undefined : page - 1;

  return {
    data,
    meta: {
      itemCount: data.length,
      totalItems: total,
      itemsPerPage: limit,
      totalPages: last,
      currentPage: page,
    },
    links: {
      first: `/books?limit=${limit}`,
      last: `/books?page=${last}&limit=${limit}`,
      ...(previous && { previous: `/books?page=${previous}&limit=${limit}` }),
      ...(next && { next: `/books?page=${next}&limit=${limit}` }),
    },
  };
}
