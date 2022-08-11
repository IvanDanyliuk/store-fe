import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './app/components/layout/Layout';
import Home from './app/pages/Home';
import Products from './app/pages/Products';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
