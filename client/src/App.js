
import { BrowserRouter, Router, Route, Routes, Link } from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './ProductScreen';

function App() {
  return (
    <BrowserRouter>
    <div>
      <header >
        <Link to="/">
          Patagonia
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path='/product/:slug' element={<ProductScreen />} />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
