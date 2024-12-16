//styles
import './SearchBar.css';


export default function SearchBar({ onSearch } : { onSearch: (search: string) => void }) {
    const handleInputChange = (event: any) => {
        onSearch(event.target.value);
    };

    return (
            <input
                className="search-bar"
                type="text"
                placeholder="Search"
                onChange={handleInputChange}
            />
    );
}