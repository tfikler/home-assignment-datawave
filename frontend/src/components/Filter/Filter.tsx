// Filter.tsx
import './Filter.css';
import { useRef } from "react";

interface FilterProps {
    onFilterChange: (filterType: string) => void;
    currentFilter: string;
}

export default function Filter({ onFilterChange, currentFilter }: FilterProps) {
    const searchByRef = useRef<HTMLSelectElement>(null);

    return (
        <div className="filter">
            <label className="filter-label">Search by:</label>
            <select
                className="options"
                onChange={(e) => onFilterChange(e.target.value)}
                value={currentFilter}
                ref={searchByRef}
            >
                <option value="name">Name</option>
                <option value="code">Code</option>
            </select>
        </div>
    );
}