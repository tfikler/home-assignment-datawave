import './Countries.css';
import CustomTable from "../../components/CustomTable/CustomTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useCallback, useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchRows } from "../../slices/countries-slice";

export default function Countries() {
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const { rows, loading, error } = useAppSelector((state) => state.table);

    useEffect(() => {
        dispatch(fetchRows({ page, limit: 5 }));
    }, [dispatch, page]);

    const handleSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
            setPage(1); // Reset to first page when searching
        }, 300),
        []
    );

    const filteredData = rows?.data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="content-countries">
            <SearchBar onSearch={handleSearch} />
            <CustomTable
                rows={filteredData || []}
                page={page}
                totalPages={rows?.meta.lastPage || 1}
                onPageChange={setPage}
            />
        </div>
    );
}