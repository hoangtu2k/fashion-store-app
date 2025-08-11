import '@style/home.css';
import Header from '@components/Home/Header';
import Footer from '@components/Home/Footer';
import Home from './Home';
import Cart from './Cart';

export default function Index() {
  const cartCount = 3;

  return (
    <div className="home-container">
      <Header cartCount={cartCount} />
      <Home />
      <Cart />
      <CheckOut />
      <Footer />
    </div>
  );
}
