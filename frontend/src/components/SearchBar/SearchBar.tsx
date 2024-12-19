//styles
import './SearchBar.css';
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
                style={{width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: 'none', color: 'black', height: '30px', outline: 'none'}}
            />
        </div>
    );
}