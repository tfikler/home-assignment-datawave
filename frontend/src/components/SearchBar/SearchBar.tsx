//styles
import './SearchBar.css';


export default function SearchBar({ onSearch } : { onSearch: (search: string) => void }) {
    const handleInputChange = (event: any) => {
        onSearch(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for a country"
                onChange={handleInputChange}
                style={{width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #fff', color: 'black', height: '30px'}}
            />
        </div>
    );
}