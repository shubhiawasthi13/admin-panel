
import { createRoot } from 'react-dom/client'
import './index.css'
import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Zomato from './zomato_orders/zomato.jsx';
import Inventory from './Inventory/Inventory.jsx';
import Reorder from './Inventory/Reorder.jsx';
import AddDish from './add-dish/add-dish.jsx';
import App from './App.jsx';
import Dashboard from './dashboard/dasboard.jsx';
import SetupPage from './Set-up/setup_page.jsx';
import ReportPage from './Report/report.jsx'
import Ingredients from './ingredients/Ingredients.jsx';
// import RestaurantHistory from './Retsro-History/restro-history.jsx';


const Orders = lazy(() => import('./orders/orders.jsx'));
const RestaurantHistory = lazy(() => import('./Retsro-History/restro-history.jsx'));

createRoot(document.getElementById('root')).render(
        <>
      <Router>
          <Routes>
            <Route path="/" element={<App/>} >
            <Route index element= {<Dashboard/>}/>
            <Route path="add-dish" element={<AddDish />} />
            <Route path="orders" element={<Orders />} />
            <Route path="zomato" element={<Zomato />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="setup" element={<SetupPage />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="history" element={<RestaurantHistory />} />
            <Route path="reorder" element={<Reorder />} />
            <Route path="ingredients" element={<Ingredients />} />
            {/* <Route path="/settings" element={<Setting />} /> */}
            </Route>
          </Routes>
      </Router>
    </>
)
