import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/navigation-bar/navigation-bar.component';
import Home from './routes/home/home';
import About from './routes/about/about';
import AccountDetails from './routes/account-details/account-details';
import ConfirmCart from './routes/confirm-cart/confirm-cart';
import Contact from './routes/contact/contact';
import PastWinners from './routes/past-winners/past-winners';
import PurchaseSuccess from './routes/purchase-success/purchase-success';
import Billing from './routes/billing/billing';
import Test from './routes/test/test';


function App() {
  return (
    <div className='full-page-container'>
      <NavigationBar/>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>} />
          <Route path={'/about'} element={<About/>} />
          <Route path={'/account-details'} element={<AccountDetails/>} />
          <Route path={'/billing'} element={<Billing/>} />
          <Route path={'/confirm-cart'} element={<ConfirmCart/>} />
          <Route path={'/contact'} element={<Contact/>} />
          <Route path={'/past-winners'} element={<PastWinners/>} />
          <Route path={'/purchase-success'} element={<PurchaseSuccess/>} />
          <Route path={'/test'} element={<Test/>} />
        </Route>
      </Routes>
      <div className='footer'>
        <h3>Mossbank and District Recreation Board</h3>
        <p>Dare To Dream Lotto</p>
        <p>P.O. Box 391 Mossbank, SK S0H 3G0</p>
        <p>Phone: 1-866-359-2WIN (2946)</p>
        <p>Email: mossbankdaretodreamlotto@gmail.com</p>
      </div>
    </div>
  );
}

export default App;
