import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './app/components/layout/Layout';
import Categories from './app/pages/Categories';
import Home from './app/pages/Home';
import Product from './app/pages/Product';
import Products from './app/pages/Products';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:category' element={<Products />} />
            <Route path='/products/:category/:id' element={<Product />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/categories/:category' element={<Categories />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
