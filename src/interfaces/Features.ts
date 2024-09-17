export interface querystring {
    sort?: string,
    filter?: string[],
    limitFields?: string,
    search?: string[],
    page?: number,
    limit?:number,
    [Key: string]: any
}
export interface PaginationQuery {
    totalPages?: number;
    currentPage?: number;
    limit?: number;
    next?: number;
    prev?: number;

}