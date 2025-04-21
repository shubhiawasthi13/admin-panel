

// import React, { useState } from 'react';
// import './history.css';
// import { FaSearch  } from 'react-icons/fa';


// const sampleData = [
//   {
//     tableNo: '14',
//     time: 'Apr 17, 2025 - 11:23 AM',
//     item: 'Grilled Salmon',
//     quantity: '2',
//     price: 450,
//     discount: 0,
//     remarks: 'Item manually added to bill',
//   },
//   {
//     tableNo: '5',
//     time: 'Apr 17, 2025 - 10:12 AM',
//     item: 'Caesar Salad',
//     quantity: '1',
//     price: 280,
//     discount: 0,
//     remarks: 'Item removed from bill',
//   },
//   {
//     tableNo: '2,3,4',
//     time: 'Apr 17, 2025 - 08:23 AM',
//     item: 'Multiple tables',
//     quantity: '1',
//     remarks: 'Tables combined as one',
//   },
//   {
//     tableNo: '22',
//     time: 'Apr 16, 2025 - 10:23 AM',
//     item: 'Chocolate Mousse',
//     quantity: '2',
//     price: 200,
//     discount: 0,
//     changeType: 'increase', // or 'decrease'
//     remarks: 'Item quantity manually updated',
//   }
// ,  
//   {
//     tableNo: '8',
//     time: 'Apr 17, 2025 - 12:23 AM',
//     item: 'Entire Bill',
//     quantity: '10%',
//     remarks: 'Manual discount was applied to bill total',
//     originalTotal: 1000,
//   },
// ];

// const mockOrders = [
//   {
//     orderId: '#1235642',
//     tableNo: '01',
//     dateTime: 'Apr 18, 2025 - 08:42 AM',
//     items: 'Grilled Salmon, Caesar Salad, Tiramisu',
//     total: '₹784.50',
//     count: 3,
//   },
//   {
//     orderId: '#1235643',
//     tableNo: '03',
//     dateTime: 'Apr 17, 2025 - 09:15 AM',
//     items: 'Pasta Alfredo, Garlic Bread',
//     total: '₹645.00',
//     count: 2,
//   },
//   {
//     orderId: '#1235644',
//     tableNo: '05',
//     dateTime: 'Apr 17, 2025 - 01:05 PM',
//     items: 'Margherita Pizza, Lemonade',
//     total: '₹510.00',
//     count: 2,
//   },
//   {
//     orderId: '#1235645',
//     tableNo: '02',
//     dateTime: 'Apr 16, 2025 - 11:30 AM',
//     items: 'Paneer Tikka, Naan, Mango Lassi',
//     total: '₹890.00',
//     count: 3,
//   },
//   {
//     orderId: '#1235646',
//     tableNo: '06',
//     dateTime: 'Apr 15, 2025 - 12:10 PM',
//     items: 'Chicken Biryani, Raita, Gulab Jamun',
//     total: '₹970.00',
//     count: 3,
//   },
//   {
//     orderId: '#1235647',
//     tableNo: '01',
//     dateTime: 'Apr 14, 2025 - 01:22 PM',
//     items: 'Club Sandwich, Cold Coffee',
//     total: '₹560.00',
//     count: 2,
//   },
//   {
//     orderId: '#1235648',
//     tableNo: '04',
//     dateTime: 'Apr 13, 2025 - 02:40 PM',
//     items: 'Butter Chicken, Garlic Naan',
//     total: '₹815.00',
//     count: 2,
//   },
//   {
//     orderId: '#1235649',
//     tableNo: '07',
//     dateTime: 'Apr 12, 2025 - 03:55 PM',
//     items: 'Veg Burger, Fries, Iced Tea',
//     total: '₹430.00',
//     count: 3,
//   },
//   {
//     orderId: '#1235650',
//     tableNo: '08',
//     dateTime: 'Apr 11, 2025 - 05:10 PM',
//     items: 'Sushi Platter, Miso Soup',
//     total: '₹1220.00',
//     count: 2,
//   },
//   {
//     orderId: '#1235651',
//     tableNo: '02',
//     dateTime: 'Apr 10, 2025 - 06:25 PM',
//     items: 'Grilled Chicken, Mashed Potatoes, Brownie',
//     total: '₹995.00',
//     count: 3,
//   },
// ];

// const mockInventory = [
//   {
//     item: 'Premium Red Wine',
//     restoredDate: 'Apr 15, 2025',
//     restoredQuantity: '20 kg',
//     currentStock: '8 kg',
//   },
//   {
//     item: 'Premium Red Wine',
//     restoredDate: 'Apr 14, 2025',
//     restoredQuantity: '15 kg',
//     currentStock: '6 kg',
//   },
//   {
//     item: 'Olive Oil',
//     restoredDate: 'Apr 13, 2025',
//     restoredQuantity: '10 L',
//     currentStock: '5 L',
//   },
//   {
//     item: 'Cheddar Cheese',
//     restoredDate: 'Apr 12, 2025',
//     restoredQuantity: '12 kg',
//     currentStock: '3.5 kg',
//   },
//   {
//     item: 'Fresh Basil',
//     restoredDate: 'Apr 11, 2025',
//     restoredQuantity: '5 kg',
//     currentStock: '2 kg',
//   },
//   {
//     item: 'Tomato Sauce',
//     restoredDate: 'Apr 10, 2025',
//     restoredQuantity: '25 L',
//     currentStock: '10 L',
//   },
//   {
//     item: 'Pasta',
//     restoredDate: 'Apr 09, 2025',
//     restoredQuantity: '50 kg',
//     currentStock: '22 kg',
//   },
//   {
//     item: 'Parmesan',
//     restoredDate: 'Apr 08, 2025',
//     restoredQuantity: '10 kg',
//     currentStock: '4 kg',
//   },
//   {
//     item: 'White Wine',
//     restoredDate: 'Apr 07, 2025',
//     restoredQuantity: '18 kg',
//     currentStock: '7 kg',
//   },
//   {
//     item: 'Tiramisu Mix',
//     restoredDate: 'Apr 06, 2025',
//     restoredQuantity: '6 kg',
//     currentStock: '3 kg',
//   },
// ];

// // Helper function to parse date from the dateTime string
// const parseOrderDate = (dateTimeStr) => {
//   const dateStr = dateTimeStr.split(' - ')[0];
//   const months = {
//     Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
//     Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
//   };
//   const parts = dateStr.split(' ');
//   const month = months[parts[0]];
//   const day = parts[1].replace(',', '').padStart(2, '0');
//   const year = parts[2];
//   return `${year}-${month}-${day}`;
// };

// // Helper function to parse date from the restored string
// const parseInventoryDate = (restoredStr) => {
//   const dateStr = restoredStr.split(' ')[0] + ' ' + restoredStr.split(' ')[1] + ' ' + restoredStr.split(' ')[2];
//   const months = {
//     Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
//     Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
//   };
//   const parts = dateStr.split(' ');
//   const month = months[parts[0]];
//   const day = parts[1].replace(',', '').padStart(2, '0');
//   const year = parts[2];
//   return `${year}-${month}-${day}`;
// };

// export default function RestaurantHistory() {
//   const [activeTab, setActiveTab] = useState('orders');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
  

//   const filteredOrders = mockOrders.filter(order => {
//     const matchesSearch = order.items.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          order.orderId.includes(searchTerm);
    
//     // If no date is selected, only filter by search term
//     if (!selectedDate) return matchesSearch;
    
//     // If date is selected, filter by both date and search term
//     const orderDate = parseOrderDate(order.dateTime);
//     const matchesDate = orderDate === selectedDate;
//     return matchesDate && matchesSearch;
//   });

//   const filteredInventory = mockInventory.filter(entry => {
//     const matchesSearch = entry.item.toLowerCase().includes(searchTerm.toLowerCase());
  
//     if (!selectedDate) return matchesSearch;
  
//     const inventoryDate = parseInventoryDate(entry.restoredDate); // ✅ correct key
//     const matchesDate = inventoryDate === selectedDate;
//     return matchesDate && matchesSearch;
//   });
  

//   return (
//     <div className="restaurant-history-container">
//       <h2>Restaurant History</h2>
//       <hr />

//       {/* Filters */}
//       <div className="filters">
//         <div className="filter-group">
//           <label>Date Range</label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//           {selectedDate && (
//             <button 
//               className="clear-date" 
//               onClick={() => setSelectedDate('')}
//             >
//               Clear
//             </button>
//           )}
//         </div>
//         <div className="filter-group">
//              {!searchTerm && (
//        <FaSearch style={{position:"absolute", top:"40px" ,left:"10px",color:"grey"}}/>
//          )}
//           <input
//             type="text"
//             placeholder="     Search Inventory Item or Order"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{marginTop:"25px"}}
//           />
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="tabs">
//         <div
//           className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
//           onClick={() => setActiveTab('orders')}
//         >
//           Order History
//         </div>
//         <div
//           className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
//           onClick={() => setActiveTab('inventory')}
//         >
//           Inventory History
//         </div>
//       </div>

//       {/* Content */}
//       {activeTab === 'orders' ? (
//         <div className="table-wrapper">
//           {filteredOrders.length > 0 ? (
//             <table className="orders-table">
//               <thead>
//                 <tr>
//                   <th>ORDER ID</th>
//                   <th>TABLE NO</th>
//                   <th>DATE & TIME</th>
//                   <th>ITEMS</th>
//                   <th>TOTAL</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.map((order, idx) => (
//                   <tr key={idx}>
//                     <td>{order.orderId}</td>
//                     <td>{order.tableNo}</td>
//                     <td>{order.dateTime}</td>
//                     <td>
//                       {order.items}
//                       <small>{order.count} Items</small>
//                     </td>
//                     <td>{order.total}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div className="no-data-message">
//               {selectedDate 
//                 ? "No orders found for the selected date and search criteria."
//                 : "No orders found matching your search criteria."}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="table-wrapper">
//           {filteredInventory.length > 0 ? (
//             <table className="orders-table">
//         <thead>
//   <tr>
//     <th>ITEM</th>
//     <th>OLD STOCK</th>
//     <th>RESTORED</th>
//     <th>CURRENT STOCK</th>
//   </tr>
// </thead>
// <tbody>
//   {filteredInventory.map((entry, idx) => {
//     const unit = entry.currentStock.match(/[a-zA-Z]+/)[0];
//     const currentVal = parseFloat(entry.currentStock);
//     const restoredVal = parseFloat(entry.restoredQuantity);
//     const oldVal = (currentVal + restoredVal).toFixed(2);

//     return (
//       <tr key={idx}>
//         <td style={{ fontWeight: "bold" }}>{entry.item}</td>
//         <td>{entry.currentStock}</td>
//         <td>{entry.restoredDate} (+{entry.restoredQuantity})</td>
//         <td>{oldVal} {unit}</td>
//       </tr>
//     );
//   })}
// </tbody>

//             </table>
//           ) : (
//             <div className="no-data-message">
//               {selectedDate 
//                 ? "No inventory updates found for the selected date and search criteria."
//                 : "No inventory updates found matching your search criteria."}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState } from 'react';
import './history.css';
import { FaSearch } from 'react-icons/fa';

const sampleData = [
  {
    tableNo: '01',
    time: '	Apr 18, 2025 - 08:42 AM',
    item: 'Grilled Salmon',
    quantity: '2',
    price: 450,
    discount: 0,
    remarks: 'Item manually added to bill',
  },
  {
    tableNo: '01',
    time: '	Apr 14, 2025 - 01:22 PM',
    item: 'Caesar Salad',
    quantity: '1',
    price: 280,
    discount: 0,
    remarks: 'Item removed from bill',
   
  },
  {
    tableNo: '02',
    time: 'Apr 10, 2025 - 06:25 PM',
    item: 'Caesar Salad',
    quantity: '1',
    price: 280,
    discount: 0,
    remarks: 'Item removed from bill',
  },
  {
    tableNo: '02',
    time: 'Apr 16, 2025 - 11:30 AM',
    item: 'Chocolate Mousse',
    quantity: '2',
    price: 200,
    discount: 0,
    changeType: 'increase', // or 'decrease'
    remarks: 'Item quantity manually updated',
  }
,  
{
  tableNo: '07',
  time: 'Apr 12, 2025 - 03:55 PM',
  item: 'Chocolate Mousse',
  quantity: '2',
  price: 200,
  discount: 0,
  changeType: 'increase', // or 'decrease'
  remarks: 'Item quantity manually updated',
}
,  
  {
    tableNo: '08',
    time: 'Apr 11, 2025 - 05:10 PM',
    item: 'Entire Bill',
    quantity: '10%',
    remarks: 'Manual discount was applied to bill total',
    originalTotal: 1000,
  },
];

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
    total: '₹900.00',
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
const Modal = ({data, tableNo, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h4>Report of Table No: {tableNo}</h4>
        <hr />
        <ul className="orders-list" style={{listStyleType: 'none', paddingLeft: '0'}}>
          {data.map((entry, index) => (
            <li key={index} style={{marginTop: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px"}}>
            
              <strong>TIME</strong>: {entry.time}
              <br />
              <strong>ITEM NAME</strong>: {entry.item}
              <br />
              <strong>QUANTITY</strong>: {entry.quantity}
              <br />
              <strong>REMARKS</strong>: 
              {entry.originalTotal && typeof entry.quantity === 'string' && entry.quantity.includes('%') ? (
                <>
                  {(() => {
                    const percent = parseFloat(entry.quantity);
                    if (!isNaN(percent)) {
                      const discountAmount = (percent / 100) * entry.originalTotal;
                      const finalTotal = entry.originalTotal - discountAmount;

                      return (
                        <>
                        
                            Manual discount of ₹{Math.round(discountAmount)} ({entry.quantity}) was applied to bill total.
                        
                          <br />
                          <strong>Original Total:</strong> ₹{Math.round(entry.originalTotal)}
                          <br />
                          <strong>Discounted Total:</strong> ₹{Math.round(finalTotal)}
                        </>
                      );
                    } else {
                      return <>{entry.remarks}</>;
                    }
                  })()}
                </>
              ) : (
                <>
                  {entry.remarks}
                  {entry.changeType && entry.remarks?.toLowerCase().includes('quantity') && (
                    <>
                      <br />
                      <strong>Change:</strong>{' '}
                      {entry.changeType === 'increase' ? 'Quantity Increased' : 'Quantity Decreased'}
                    </>
                  )}
                  {entry.price !== undefined && (
                    <>
                      <br />
                      <strong>Unit Price:</strong> ₹{Math.round(entry.price)}
                      {entry.quantity && !isNaN(entry.quantity) && (
                        <>
                          <br />
                          <strong>Total:</strong> ₹{Math.round(entry.price * Number(entry.quantity))}
                        </>
                      )}
                    </>
                  )}
                  {entry.discount !== undefined && entry.discount > 0 && (
                    <>
                      <br />
                      <strong>After Discount:</strong> ₹{Math.round(entry.price - entry.discount)}
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>

        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};



export default function RestaurantHistory() {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTableNo, setSelectedTableNo] = useState(null);
  const [modalData, setModalData] = useState([]);

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
  
    if (!selectedDate) return matchesSearch;
  
    const inventoryDate = parseInventoryDate(entry.restoredDate); // ✅ correct key
    const matchesDate = inventoryDate === selectedDate;
    return matchesDate && matchesSearch;
  });
  const handleTableClick = (tableNo, dateTime) => {
    // Find all entries for the clicked table number with matching dateTime
    const filteredData = sampleData.filter(entry => 
      entry.tableNo === tableNo && entry.time.trim() === dateTime.trim()
    );
  
    if (filteredData.length === 0) {
      console.log('No data found for table:', tableNo, 'at time:', dateTime);
    } else {
      console.log('Filtered Data for table', tableNo, 'at time', dateTime, ':', filteredData);
    }
  
    // Set the filtered data for the modal and open the modal
    setModalData(filteredData);
    setSelectedTableNo(tableNo);
    setIsModalOpen(true);
  };
  
  
  
  
  
  {isModalOpen && (
    <Modal
      data={modalData}  // Pass filtered data to Modal
      tableNo={selectedTableNo}
      closeModal={() => setIsModalOpen(false)}
    />
  )}
  
  

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
    <td 
      style={{ cursor: 'pointer', color: 'blue' }} 
      onClick={() => handleTableClick(order.tableNo, order.dateTime)}
    >
      {order.tableNo}
    </td>
    <td>{order.dateTime}</td>
    <td>{order.items}</td>
    <td>{order.total}</td>
  </tr>
))}
              </tbody>
            </table>
          ) : (
            <div className="no-data-message">No orders found.</div>
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
      
      {isModalOpen && (
        <Modal
          data={modalData}
          tableNo={selectedTableNo}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}










