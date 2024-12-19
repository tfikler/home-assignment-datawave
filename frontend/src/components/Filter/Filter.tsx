//styles
import './Filter.css';

export default function Filter() {
    return (
        <div className="filter">
            <label className="filter-label">Search by:</label>
            <select className="options">
                <option value="name">Name</option>
                <option value="code">Code</option>
            </select>
        </div>
    );
}