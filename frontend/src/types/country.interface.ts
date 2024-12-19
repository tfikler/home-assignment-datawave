export interface Country {
    id: number;
    name: string;
    code: string;
    description?: string;
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

window.addEventListener('resize', () => {
    ITEMS_PER_PAGE = window.innerWidth < 1300 ? 5 : 8;
});
export let ITEMS_PER_PAGE = window.innerWidth < 1300 ? 3 : 8;