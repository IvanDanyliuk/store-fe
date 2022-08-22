import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './app/components/layout/Layout';
import Editor from './app/components/settingsTabs/Editor';
import Orders from './app/components/settingsTabs/Orders';
import Profile from './app/components/settingsTabs/Profile';
import Reviews from './app/components/settingsTabs/Reviews';
import WishList from './app/components/settingsTabs/WishList';
import About from './app/pages/About';
import Categories from './app/pages/Categories';
import Home from './app/pages/Home';
import Product from './app/pages/Product';
import Products from './app/pages/Products';
import Settings from './app/pages/Settings';


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
              <Route path='/settings' element={<Settings />}>
                <Route index element={<Orders />} />
                <Route path='orders' element={<Orders />} />
                <Route path='wish-list' element={<WishList />} />
                <Route path='reviews' element={<Reviews />} />
                <Route path='profile' element={<Profile />} />
                <Route path='editor' element={<Editor />} />
              </Route>
              <Route path='/about' element={<About />} />
            </Routes>
          </Layout>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
