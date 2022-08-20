import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './app/components/layout/Layout';
import About from './app/pages/About';
import Categories from './app/pages/Categories';
import Home from './app/pages/Home';
import Product from './app/pages/Product';
import Products from './app/pages/Products';


const App: React.FC = () => {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <Router>
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products/:category' element={<Products />} />
              <Route path='/products/:category/:id' element={<Product />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/categories/:category' element={<Categories />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </Layout>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
