//styles
import './SearchBar.css';

//react
import {useEffect, useRef} from "react";


export default function SearchBar({ onSearch, value } : { onSearch: (search: string) => void, value: string}) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (value){
            inputRef.current?.focus();
        }
    }, [value]);

    return (
        <div className="search-bar">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search for a country"
                onChange={(e) => onSearch(e.target.value)}
                value={value}
            />
        </div>
    );
}