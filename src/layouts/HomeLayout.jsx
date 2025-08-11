import Header from '@components/Home/Header';
import Footer from '@components/Home/Footer';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
  const cartCount = 3; // hoặc lấy từ state/context

  return (
    <div className="home-container">
      <Header cartCount={cartCount} />
      <main>
        <Outlet /> {/* Render page con */}
      </main>
      <Footer />
    </div>
  );
}
