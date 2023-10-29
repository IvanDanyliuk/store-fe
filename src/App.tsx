import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './app/components/layout/Layout';
import { Editor, Orders, Profile, Reviews, WishList } from './app/components/settingsTabs';
import { 
  About, Auth, Careers, Categories, Contacts, DeliveryAndPayment, Home, LegalInfo, NotFound, 
  Order, Partnership, Product, Products, Refund, Settings, Tradein, Vacancy 
} from './app/pages';
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