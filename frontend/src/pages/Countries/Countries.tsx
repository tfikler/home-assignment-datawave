//styles
import './Countries.css';
import CustomTable from "../../components/CustomTable/CustomTable.tsx";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";


//react
import {useCallback, useEffect, useState} from "react";
import debounce from 'lodash.debounce';
// import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../store.ts";
import {fetchRows} from "../../slices/countries-slice.ts";

export default function Countries() {
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const { rows, loading, error } = useAppSelector((state) => state.table);

    useEffect(() => {
        dispatch(fetchRows()); // Fetch rows when the component mounts
    }, [dispatch]);

    const handleSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
        }, 300),
        []
    );

    const filteredData = rows.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="content-countries">
            <SearchBar onSearch={handleSearch}/>
           <CustomTable rows={filteredData}/>
        </div>
    )
}