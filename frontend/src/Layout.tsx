//styles
import './Layout.css';

//components
import Sidebar from './components/Sidebar/Sidebar.tsx';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="layout">
            <Sidebar />
            <div className="content">
                {children}
            </div>
        </div>
    );
}