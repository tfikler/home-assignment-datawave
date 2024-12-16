// styles
import './Sidebar.css';

// react
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="sidebar-header">Dashboard</h2>
            <p className="links">
                <Link to="/Countries">Countries</Link>
                <Link to="/WorldMap">World Map</Link>
            </p>
        </div>
    )
}