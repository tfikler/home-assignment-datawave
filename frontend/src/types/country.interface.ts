export interface Country {
    id: number;
    name: string;
    code: string;
    population?: number;
    size?: number;
    flag?: string;
    lat?: number;
    lng?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
}