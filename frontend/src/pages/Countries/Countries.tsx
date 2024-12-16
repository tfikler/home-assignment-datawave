//styles
import './Countries.css';
import CustomTable from "../../components/CustomTable/CustomTable.tsx";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";


//react
import {useCallback, useState} from "react";
import debounce from 'lodash.debounce';
import { useSelector} from "react-redux";

export default function Countries() {
    const [searchQuery, setSearchQuery] = useState('');
    const rows = useSelector((state: any) => state.table.rows);
    const handleSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
        }, 300),
        []
    );

    const filteredData = rows.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="content-countries">
            <SearchBar onSearch={handleSearch}/>
           <CustomTable rows={filteredData}/>
        </div>
    )
}