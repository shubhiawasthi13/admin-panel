
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

const Orders = lazy(() => import('./orders/orders.jsx'));

createRoot(document.getElementById('root')).render(
        <>
      <Router>
          <Routes>
            <Route path="/" element={<App/>} >
            <Route index element= {<Dashboard/>}/>
            <Route path="add-dish" element={<AddDish />} />
            <Route path="orders" element={<Orders />} />
            {/* <Route path="/add-dish" element={<AddDish />} /> */}
            <Route path="zomato" element={<Zomato />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="reorder" element={<Reorder />} />
            {/* <Route path="/settings" element={<Setting />} /> */}
            </Route>
          </Routes>
      </Router>
    </>
)
