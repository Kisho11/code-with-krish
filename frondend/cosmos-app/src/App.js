import './App.css';
import { BrowserRouter } from 'react-router-dom';
import OrderManagement from './components/order-management';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <div>
        <nav>
          <Navigation nav={"Order Management"} url="/order-management" />
        </nav>
      </div>
      <Routes>
        <Route path="/order-management" element={<OrderManagement/>} ></Route>
      </Routes>
    </BrowserRouter>
    </div> 
  );
}

function Navigation({nav, url}) {
  return (
    <li>
      <Link to={url}>{nav}</Link>
    </li>
  );
}

export default App;
