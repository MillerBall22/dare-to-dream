import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/navigation-bar/navigation-bar.component';
import Home from './routes/home/home';
import About from './routes/about/about';
import AccountDetails from './routes/account-details/account-details';
import Address from './routes/address/address';
import ConfirmCart from './routes/confirm-cart/confirm-cart';
import Contact from './routes/contact/contact';
import PastWinners from './routes/past-winners/past-winners';
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
          <Route path={'/address'} element={<Address/>} />
          <Route path={'/confirm-cart'} element={<ConfirmCart/>} />
          <Route path={'/contact'} element={<Contact/>} />
          <Route path={'/past-winners'} element={<PastWinners/>} />
          <Route path={'/test'} element={<Test/>} />
        </Route>
      </Routes>
      <div className='footer'>
        <h3>Town of Mossbank</h3>
        <p>311 Main St, P.O. Box 370 Mossbank, SK S0H 3G0</p>
        <p>Phone: 306-354-2294</p>
        <p>Fax: 306-354-7725</p>
        <p>Email: townofmossbank@sasktel.net</p>
      </div>
    </div>
  );
}

export default App;
