import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HomeLayout() {
  return (
    <div className="min-h-screen bg-doc-bg text-doc-text">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
