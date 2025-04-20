

import React, { useState } from 'react';
import './history.css';
import { FaSearch  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const mockOrders = [
  {
    orderId: '#1235642',
    tableNo: '01',
    dateTime: 'Apr 18, 2025 - 08:42 AM',
    items: 'Grilled Salmon, Caesar Salad, Tiramisu',
    total: '₹784.50',
    count: 3,
  },
  {
    orderId: '#1235643',
    tableNo: '03',
    dateTime: 'Apr 17, 2025 - 09:15 AM',
    items: 'Pasta Alfredo, Garlic Bread',
    total: '₹645.00',
    count: 2,
  },
  {
    orderId: '#1235644',
    tableNo: '05',
    dateTime: 'Apr 17, 2025 - 01:05 PM',
    items: 'Margherita Pizza, Lemonade',
    total: '₹510.00',
    count: 2,
  },
  {
    orderId: '#1235645',
    tableNo: '02',
    dateTime: 'Apr 16, 2025 - 11:30 AM',
    items: 'Paneer Tikka, Naan, Mango Lassi',
    total: '₹890.00',
    count: 3,
  },
  {
    orderId: '#1235646',
    tableNo: '06',
    dateTime: 'Apr 15, 2025 - 12:10 PM',
    items: 'Chicken Biryani, Raita, Gulab Jamun',
    total: '₹970.00',
    count: 3,
  },
  {
    orderId: '#1235647',
    tableNo: '01',
    dateTime: 'Apr 14, 2025 - 01:22 PM',
    items: 'Club Sandwich, Cold Coffee',
    total: '₹560.00',
    count: 2,
  },
  {
    orderId: '#1235648',
    tableNo: '04',
    dateTime: 'Apr 13, 2025 - 02:40 PM',
    items: 'Butter Chicken, Garlic Naan',
    total: '₹815.00',
    count: 2,
  },
  {
    orderId: '#1235649',
    tableNo: '07',
    dateTime: 'Apr 12, 2025 - 03:55 PM',
    items: 'Veg Burger, Fries, Iced Tea',
    total: '₹430.00',
    count: 3,
  },
  {
    orderId: '#1235650',
    tableNo: '08',
    dateTime: 'Apr 11, 2025 - 05:10 PM',
    items: 'Sushi Platter, Miso Soup',
    total: '₹1220.00',
    count: 2,
  },
  {
    orderId: '#1235651',
    tableNo: '02',
    dateTime: 'Apr 10, 2025 - 06:25 PM',
    items: 'Grilled Chicken, Mashed Potatoes, Brownie',
    total: '₹995.00',
    count: 3,
  },
];

const mockInventory = [
  {
    item: 'Premium Red Wine',
    restoredDate: 'Apr 15, 2025',
    restoredQuantity: '20 kg',
    currentStock: '8 kg',
  },
  {
    item: 'Premium Red Wine',
    restoredDate: 'Apr 14, 2025',
    restoredQuantity: '15 kg',
    currentStock: '6 kg',
  },
  {
    item: 'Olive Oil',
    restoredDate: 'Apr 13, 2025',
    restoredQuantity: '10 L',
    currentStock: '5 L',
  },
  {
    item: 'Cheddar Cheese',
    restoredDate: 'Apr 12, 2025',
    restoredQuantity: '12 kg',
    currentStock: '3.5 kg',
  },
  {
    item: 'Fresh Basil',
    restoredDate: 'Apr 11, 2025',
    restoredQuantity: '5 kg',
    currentStock: '2 kg',
  },
  {
    item: 'Tomato Sauce',
    restoredDate: 'Apr 10, 2025',
    restoredQuantity: '25 L',
    currentStock: '10 L',
  },
  {
    item: 'Pasta',
    restoredDate: 'Apr 09, 2025',
    restoredQuantity: '50 kg',
    currentStock: '22 kg',
  },
  {
    item: 'Parmesan',
    restoredDate: 'Apr 08, 2025',
    restoredQuantity: '10 kg',
    currentStock: '4 kg',
  },
  {
    item: 'White Wine',
    restoredDate: 'Apr 07, 2025',
    restoredQuantity: '18 kg',
    currentStock: '7 kg',
  },
  {
    item: 'Tiramisu Mix',
    restoredDate: 'Apr 06, 2025',
    restoredQuantity: '6 kg',
    currentStock: '3 kg',
  },
];

// Helper function to parse date from the dateTime string
const parseOrderDate = (dateTimeStr) => {
  const dateStr = dateTimeStr.split(' - ')[0];
  const months = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  };
  const parts = dateStr.split(' ');
  const month = months[parts[0]];
  const day = parts[1].replace(',', '').padStart(2, '0');
  const year = parts[2];
  return `${year}-${month}-${day}`;
};

// Helper function to parse date from the restored string
const parseInventoryDate = (restoredStr) => {
  const dateStr = restoredStr.split(' ')[0] + ' ' + restoredStr.split(' ')[1] + ' ' + restoredStr.split(' ')[2];
  const months = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  };
  const parts = dateStr.split(' ');
  const month = months[parts[0]];
  const day = parts[1].replace(',', '').padStart(2, '0');
  const year = parts[2];
  return `${year}-${month}-${day}`;
};

export default function RestaurantHistory() {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.items.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.orderId.includes(searchTerm);
    
    // If no date is selected, only filter by search term
    if (!selectedDate) return matchesSearch;
    
    // If date is selected, filter by both date and search term
    const orderDate = parseOrderDate(order.dateTime);
    const matchesDate = orderDate === selectedDate;
    return matchesDate && matchesSearch;
  });

  const filteredInventory = mockInventory.filter(entry => {
    const matchesSearch = entry.item.toLowerCase().includes(searchTerm.toLowerCase());
    
    // If no date is selected, only filter by search term
    if (!selectedDate) return matchesSearch;
    
    // If date is selected, filter by both date and search term
    const inventoryDate = parseInventoryDate(entry.restored);
    const matchesDate = inventoryDate === selectedDate;
    return matchesDate && matchesSearch;
  });

  return (
    <div className="restaurant-history-container">
      <h2>Restaurant History</h2>
      <hr />

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Date Range</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {selectedDate && (
            <button 
              className="clear-date" 
              onClick={() => setSelectedDate('')}
            >
              Clear
            </button>
          )}
        </div>
        <div className="filter-group">
             {!searchTerm && (
       <FaSearch style={{position:"absolute", top:"40px" ,left:"10px",color:"grey"}}/>
         )}
          <input
            type="text"
            placeholder="     Search Inventory Item or Order"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{marginTop:"25px"}}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Order History
        </div>
        <div
          className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory History
        </div>
      </div>

      {/* Content */}
      {activeTab === 'orders' ? (
        <div className="table-wrapper">
          {filteredOrders.length > 0 ? (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>TABLE NO</th>
                  <th>DATE & TIME</th>
                  <th>ITEMS</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{order.orderId}</td>
                    <td>{order.tableNo}</td>
                    <td>{order.dateTime}</td>
                    <td>
                      {order.items}
                      <small>{order.count} Items</small>
                    </td>
                    <td>{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data-message">
              {selectedDate 
                ? "No orders found for the selected date and search criteria."
                : "No orders found matching your search criteria."}
            </div>
          )}
        </div>
      ) : (
        <div className="table-wrapper">
          {filteredInventory.length > 0 ? (
            <table className="orders-table">
        <thead>
  <tr>
    <th>ITEM</th>
    <th>OLD STOCK</th>
    <th>RESTORED</th>
    <th>CURRENT STOCK</th>
  </tr>
</thead>
<tbody>
  {filteredInventory.map((entry, idx) => {
    const unit = entry.currentStock.match(/[a-zA-Z]+/)[0];
    const currentVal = parseFloat(entry.currentStock);
    const restoredVal = parseFloat(entry.restoredQuantity);
    const oldVal = (currentVal + restoredVal).toFixed(2);

    return (
      <tr key={idx}>
        <td style={{ fontWeight: "bold" }}>{entry.item}</td>
        <td>{entry.currentStock}</td>
        <td>{entry.restoredDate} (+{entry.restoredQuantity})</td>
        <td>{oldVal} {unit}</td>
      </tr>
    );
  })}
</tbody>

            </table>
          ) : (
            <div className="no-data-message">
              {selectedDate 
                ? "No inventory updates found for the selected date and search criteria."
                : "No inventory updates found matching your search criteria."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}