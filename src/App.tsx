import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './app/components/layout/Layout';
import Editor from './app/components/settingsTabs/Editor';
import Orders from './app/components/settingsTabs/Orders';
import Profile from './app/components/settingsTabs/Profile';
import Reviews from './app/components/settingsTabs/Reviews';
import WishList from './app/components/settingsTabs/WishList';
import About from './app/pages/About';
import Auth from './app/pages/Auth';
import Careers from './app/pages/Careers';
import Categories from './app/pages/Categories';
import Contacts from './app/pages/Contacts';
import DeliveryAndPayment from './app/pages/DeliveryAndPayment';
import Home from './app/pages/Home';
import LegalInfo from './app/pages/LegalInfo';
import NotFound from './app/pages/NotFound';
import Order from './app/pages/Order';
import Partnership from './app/pages/Partnership';
import Product from './app/pages/Product';
import Products from './app/pages/Products';
import Refund from './app/pages/Refund';
import Settings from './app/pages/Settings';
import Tradein from './app/pages/Tradein';
import Vacancy from './app/pages/Vacancy';
import i18n from './app/services/languageConfig';


const App: React.FC = () => {
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('language') || 'en');
  }, []);

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
              <Route path='/auth' element={<Auth />} />
              <Route path='/settings' element={<Settings />}>
                <Route index element={<Orders />} />
                <Route path='orders' element={<Orders />} />
                <Route path='wish-list' element={<WishList />} />
                <Route path='reviews' element={<Reviews />} />
                <Route path='profile' element={<Profile />} />
                <Route path='editor' element={<Editor />} />
              </Route>
              <Route path='/order' element={<Order />} />
              <Route path='/about' element={<About />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/careers' element={<Careers />} />
              <Route path='/careers/:id' element={<Vacancy />} />
              <Route path='/partnership' element={<Partnership />} />
              <Route path='/trade-in' element={<Tradein />} />
              <Route path='/legal-info' element={<LegalInfo />} />
              <Route path='/shipping-and-payment' element={<DeliveryAndPayment />} />
              <Route path='/return-order' element={<Refund />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;