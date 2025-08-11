import '@style/home.css';
import HeroSection from '@components/Home/HeroSection';
import FeaturedProducts from '@components/Home/FeaturedProducts';

export default function Home() {


  const featuredItems = [
    { id: 1, name: 'Áo thun trắng', price: 150000, image: 'https://placehold.co/200x200?text=Áo+Thun' },
    { id: 2, name: 'Quần jeans đen', price: 350000, image: 'https://placehold.co/200x200?text=Quần+Jeans' },
    { id: 3, name: 'Giày sneakers', price: 500000, image: 'https://placehold.co/200x200?text=Giày+Sneakers' },
    { id: 4, name: 'Túi xách da', price: 450000, image: 'https://placehold.co/200x200?text=Túi+Xách+0' },
    { id: 5, name: 'Túi xách da 1', price: 430000, image: 'https://placehold.co/200x200?text=Túi+Xách+1' },
    { id: 6, name: 'Túi xách da 2', price: 440000, image: 'https://placehold.co/200x200?text=Túi+Xách+2' },
  ];

  return (
    <div className="home-container">
      <HeroSection />
      <FeaturedProducts featuredItems={featuredItems} />
    </div>
  );
}
