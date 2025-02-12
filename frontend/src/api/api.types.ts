export interface ApiResponse<T> {
    count: number
    results: T[]
}

export interface PaginationParams {
    limit?: number
    offset?: number
}
