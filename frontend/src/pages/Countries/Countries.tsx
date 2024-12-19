import './Countries.css';
import CustomTable from "../../components/CustomTable/CustomTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchRows } from "../../slices/countries-slice";

export default function Countries() {
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const { rows, loading, error } = useAppSelector((state) => state.table);
    const ITEMS_PER_PAGE = 5;

    // Handle the debounced search separately from the input value
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 700);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Only fetch when debounced search or page changes
    useEffect(() => {
        dispatch(fetchRows({
            page,
            limit: ITEMS_PER_PAGE,
            search: debouncedSearch
        }));
    }, [dispatch, page, debouncedSearch]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(1);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="content-countries">
            <SearchBar onSearch={handleSearch} value={searchQuery}/>
            <CustomTable
                rows={rows?.data || []}
                page={page}
                totalPages={rows?.meta.lastPage || 1}
                onPageChange={setPage}
            />
        </div>
    );
}