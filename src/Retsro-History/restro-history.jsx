// import React, { useState } from 'react';
// import './history.css';
// import { FaSearch } from 'react-icons/fa';

// const sampleData = [
//   {
//     tableNo: '01',
//     time: '	Apr 18, 2025 - 08:42 AM',
//     item: 'Grilled Salmon',
//     quantity: '2',
//     price: 450,
//     discount: 0,
//     remarks: 'Item manually added to bill',
//   },
//   {
//     tableNo: '01',
//     time: '	Apr 14, 2025 - 01:22 PM',
//     item: 'Caesar Salad',
//     quantity: '1',
//     price: 280,
//     discount: 0,
//     remarks: 'Item removed from bill',

//   },
//   {
//     tableNo: '02',
//     time: 'Apr 10, 2025 - 06:25 PM',
//     item: 'Caesar Salad',
//     quantity: '1',
//     price: 280,
//     discount: 0,
//     remarks: 'Item removed from bill',
//   },
//   {
//     tableNo: '02',
//     time: 'Apr 16, 2025 - 11:30 AM',
//     item: 'Chocolate Mousse',
//     quantity: '2',
//     price: 200,
//     discount: 0,
//     changeType: 'increase', // or 'decrease'
//     remarks: 'Item quantity manually updated',
//   }
// ,
// {
//   tableNo: '07',
//   time: 'Apr 12, 2025 - 03:55 PM',
//   item: 'Chocolate Mousse',
//   quantity: '2',
//   price: 200,
//   discount: 0,
//   changeType: 'increase', // or 'decrease'
//   remarks: 'Item quantity manually updated',
// }
// ,
//   {
//     tableNo: '08',
//     time: 'Apr 11, 2025 - 05:10 PM',
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
//     total: '₹900.00',
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
// const Modal = ({data, tableNo, closeModal }) => {
//   return (
//     <div className="modal-overlay" onClick={closeModal}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <h4>Report of Table No: {tableNo}</h4>
//         <hr />
//         <ul className="orders-list" style={{listStyleType: 'none', paddingLeft: '0'}}>
//           {data.map((entry, index) => (
//             <li key={index} style={{marginTop: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px"}}>

//               <strong>TIME</strong>: {entry.time}
//               <br />
//               <strong>ITEM NAME</strong>: {entry.item}
//               <br />
//               <strong>QUANTITY</strong>: {entry.quantity}
//               <br />
//               <strong>REMARKS</strong>:
//               {entry.originalTotal && typeof entry.quantity === 'string' && entry.quantity.includes('%') ? (
//                 <>
//                   {(() => {
//                     const percent = parseFloat(entry.quantity);
//                     if (!isNaN(percent)) {
//                       const discountAmount = (percent / 100) * entry.originalTotal;
//                       const finalTotal = entry.originalTotal - discountAmount;

//                       return (
//                         <>

//                             Manual discount of ₹{Math.round(discountAmount)} ({entry.quantity}) was applied to bill total.

//                           <br />
//                           <strong>Original Total:</strong> ₹{Math.round(entry.originalTotal)}
//                           <br />
//                           <strong>Discounted Total:</strong> ₹{Math.round(finalTotal)}
//                         </>
//                       );
//                     } else {
//                       return <>{entry.remarks}</>;
//                     }
//                   })()}
//                 </>
//               ) : (
//                 <>
//                   {entry.remarks}
//                   {entry.changeType && entry.remarks?.toLowerCase().includes('quantity') && (
//                     <>
//                       <br />
//                       <strong>Change:</strong>{' '}
//                       {entry.changeType === 'increase' ? 'Quantity Increased' : 'Quantity Decreased'}
//                     </>
//                   )}
//                   {entry.price !== undefined && (
//                     <>
//                       <br />
//                       <strong>Unit Price:</strong> ₹{Math.round(entry.price)}
//                       {entry.quantity && !isNaN(entry.quantity) && (
//                         <>
//                           <br />
//                           <strong>Total:</strong> ₹{Math.round(entry.price * Number(entry.quantity))}
//                         </>
//                       )}
//                     </>
//                   )}
//                   {entry.discount !== undefined && entry.discount > 0 && (
//                     <>
//                       <br />
//                       <strong>After Discount:</strong> ₹{Math.round(entry.price - entry.discount)}
//                     </>
//                   )}
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>

//         <button onClick={closeModal}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default function RestaurantHistory() {
//   const [activeTab, setActiveTab] = useState('orders');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTableNo, setSelectedTableNo] = useState(null);
//   const [modalData, setModalData] = useState([]);

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
//   const handleTableClick = (tableNo, dateTime) => {
//     // Find all entries for the clicked table number with matching dateTime
//     const filteredData = sampleData.filter(entry =>
//       entry.tableNo === tableNo && entry.time.trim() === dateTime.trim()
//     );

//     if (filteredData.length === 0) {
//       console.log('No data found for table:', tableNo, 'at time:', dateTime);
//     } else {
//       console.log('Filtered Data for table', tableNo, 'at time', dateTime, ':', filteredData);
//     }

//     // Set the filtered data for the modal and open the modal
//     setModalData(filteredData);
//     setSelectedTableNo(tableNo);
//     setIsModalOpen(true);
//   };

//   {isModalOpen && (
//     <Modal
//       data={modalData}  // Pass filtered data to Modal
//       tableNo={selectedTableNo}
//       closeModal={() => setIsModalOpen(false)}
//     />
//   )}

//   return (
//     <div className="restaurant-history-container">
//       <h2>Restaurant History</h2>
//             <hr />
//        {/* Filters */}
//        <div className="filters">
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
//         {/* Tabs */}
//         <div className="tabs">
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
//               {filteredOrders.map((order, idx) => (
//   <tr key={idx}>
//     <td>{order.orderId}</td>
//     <td
//       style={{ cursor: 'pointer', color: 'blue' }}
//       onClick={() => handleTableClick(order.tableNo, order.dateTime)}
//     >
//       {order.tableNo}
//     </td>
//     <td>{order.dateTime}</td>
//     <td>{order.items}</td>
//     <td>{order.total}</td>
//   </tr>
// ))}
//               </tbody>
//             </table>
//           ) : (
//             <div className="no-data-message">No orders found.</div>
//           )}
//         </div>
//       ) : (
//         <div className="table-wrapper">
//         {filteredInventory.length > 0 ? (
//           <table className="orders-table">
//       <thead>
// <tr>
//   <th>ITEM</th>
//   <th>OLD STOCK</th>
//   <th>RESTORED</th>
//   <th>CURRENT STOCK</th>
// </tr>
// </thead>
// <tbody>
// {filteredInventory.map((entry, idx) => {
//   const unit = entry.currentStock.match(/[a-zA-Z]+/)[0];
//   const currentVal = parseFloat(entry.currentStock);
//   const restoredVal = parseFloat(entry.restoredQuantity);
//   const oldVal = (currentVal + restoredVal).toFixed(2);

//   return (
//     <tr key={idx}>
//       <td style={{ fontWeight: "bold" }}>{entry.item}</td>
//       <td>{entry.currentStock}</td>
//       <td>{entry.restoredDate} (+{entry.restoredQuantity})</td>
//       <td>{oldVal} {unit}</td>
//     </tr>
//   );
// })}
// </tbody>

//           </table>
//         ) : (
//           <div className="no-data-message">
//             {selectedDate
//               ? "No inventory updates found for the selected date and search criteria."
//               : "No inventory updates found matching your search criteria."}
//           </div>
//         )}
//       </div>
//       )}

//       {isModalOpen && (
//         <Modal
//           data={modalData}
//           tableNo={selectedTableNo}
//           closeModal={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import io from "socket.io-client";
import "./history.css";

const socket = io("http://localhost:3000");

// Helper function to parse date from the restored string
const parseInventoryDate = (dateStr) => {
  const cleaned = dateStr.split("-")[0].trim(); // "Jun 2, 2025"
  const parsed = new Date(cleaned);
  if (isNaN(parsed.getTime())) return "";
  return parsed.toISOString().split("T")[0];
};

export default function RestaurantHistory() {
  const [activeTab, setActiveTab] = useState("orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filteredFinishedOrders, setFilteredFinishedOrders] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const fetchAndFilterReport = async (orderId, tableNo) => {
    try {
      setReportLoading(true);
      setReportError(null);

      const response = await fetch("http://localhost:3000/api/get-reports");
      const data = await response.json();

      console.log("🔎 API Data:", data); // Check what you're getting
      const filtered = data.filter(
        (report) =>
          String(report.orderId) === String(orderId) &&
          String(report.tableNumber) === String(tableNo)
      );

      console.log("✅ Filtered Reports:", filtered); // Check if anything matches

      setReportData(filtered);
      setShowReportModal(true);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReportError("Failed to load report data");
    } finally {
      setReportLoading(false);
    }
  };

  // Fetch inventory history from backend
  useEffect(() => {
    const fetchInventoryHistory = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/inventoryHistory"
        ); // Adjust the URL as per your backend API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch inventory history");
        }
        const data = await response.json();
        setInventoryData(data); // Set the inventory data to the state
      } catch (error) {
        console.error("Error fetching inventory history:", error);
      }
    };

    fetchInventoryHistory();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  // Filter inventory data based on search term and selected date
  const filteredInventory = inventoryData.filter((entry) => {
    const matchesSearch = entry.item_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // If no date is selected, filter only by the search term
    if (!selectedDate) return matchesSearch;
    const inventoryDate = parseInventoryDate(entry.restock_time); // ✅ correct key
    const matchesDate = inventoryDate === selectedDate;
    return matchesDate && matchesSearch;
  });

  useEffect(() => {
    socket.on("orderUpdate", (data) => {
      console.log("Order Update Received: ", data);
      const recentFinishedOrders = [...data.finishedOrders].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setFinishedOrders(recentFinishedOrders);
      setFilteredFinishedOrders(recentFinishedOrders); // Initialize filtered orders
    });

    return () => {
      socket.off("orderUpdate");
    };
  }, []);

  // Filter orders based on search term and selected date
  useEffect(() => {
    if (finishedOrders.length > 0) {
      const filtered = finishedOrders.filter((order) => {
        const searchTermLower = searchTerm.toLowerCase().trim();
        const tableNumbers =
          order.table_no != null
            ? [order.table_no.toString()]
            : Array.isArray(order.merged_table?.tables)
            ? order.merged_table.tables.map((t) => t.toString())
            : [];

        const joinedTableStr = tableNumbers.join(",").toLowerCase();

        // If searching by order ID (starts with #)
        if (searchTermLower.startsWith("#")) {
          const searchId = searchTermLower.substring(1);
          const matchesOrderId = (order.order_id ?? "")
            .toString()
            .includes(searchId);

          if (!selectedDate) return matchesOrderId;
          const orderDate = new Date(order.created_at)
            .toISOString()
            .split("T")[0];
          return matchesOrderId && orderDate === selectedDate;
        }

        // Check if searching by table number (starts with "table" or is numeric)
        const isTableSearch =
          searchTermLower.startsWith("table") || /^\d+$/.test(searchTermLower);
        if (isTableSearch) {
          let tableSearchTerm = searchTermLower;
          if (searchTermLower.startsWith("table")) {
            tableSearchTerm = searchTermLower.replace("table", "").trim();
          }

          const matchesTableNo = tableNumbers.some(
            (no) =>
              no.includes(tableSearchTerm) ||
              no.padStart(2, "0").includes(tableSearchTerm)
          );

          if (!selectedDate) return matchesTableNo;
          const orderDate = new Date(order.created_at)
            .toISOString()
            .split("T")[0];
          return matchesTableNo && orderDate === selectedDate;
        }

        // General search (items, table no, or order id)
        const matchesTableNo =
          joinedTableStr.includes(searchTermLower) ||
          `table ${joinedTableStr}`.includes(searchTermLower) ||
          joinedTableStr.padStart(2, "0").includes(searchTermLower);

        const matchesOrderId = order.order_id
          .toString()
          .includes(searchTermLower);

        const matchesItemNames = order.order_items.some((item) =>
          item.order_details.some((detail) =>
            detail.dish_name.toLowerCase().includes(searchTermLower)
          )
        );

        const matchesSearch =
          matchesTableNo || matchesOrderId || matchesItemNames;

        if (!selectedDate) return matchesSearch;

        const orderDate = new Date(order.created_at)
          .toISOString()
          .split("T")[0];
        return matchesSearch && orderDate === selectedDate;
      });

      setFilteredFinishedOrders(filtered);
    }
  }, [searchTerm, finishedOrders,selectedDate]);

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return new Date(dateString + "Z").toLocaleString();
      }
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date/Time";
    }
  };

  const getItemNames = (order) => {
    const items = order.order_items.flatMap((item) =>
      item.order_details.map((detail) => detail.dish_name)
    );

    if (items.length <= 2) {
      return items.join(", ");
    }
    return `${items.slice(0, 2).join(", ")} + ${items.length - 2} more`;
  };

  const handleItemsClick = (order, e) => {
    e.stopPropagation();
    setSelectedOrder(order);
    setShowDetails(true);
  };

  //   const matchesSearch = entry.item.toLowerCase().includes(searchTerm.toLowerCase());

  //   if (!selectedDate) return matchesSearch;

  //   const inventoryDate = parseInventoryDate(entry.restoredDate); // ✅ correct key
  //   const matchesDate = inventoryDate === selectedDate;
  //   return matchesDate && matchesSearch;
  // });

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
            <button className="clear-date" onClick={() => setSelectedDate("")}>
              Clear
            </button>
          )}
        </div>

        <div className="filter-group">
          {!searchTerm && (
            <FaSearch
              style={{
                position: "absolute",
                top: "40px",
                left: "10px",
                color: "grey",
              }}
            />
          )}
          <input
            type="text"
            placeholder="     Search Inventory item or order"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: "25px" }}
          />
          <p style={{ color: "grey", fontSize: "12px" }}>
            start with # for order ID search [ex- #26]
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Order History
        </div>
        <div
          className={`tab ${activeTab === "inventory" ? "active" : ""}`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory History
        </div>
      </div>

      {activeTab === "orders" ? (
        <div className="table-wrapper">
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
              {filteredFinishedOrders.length > 0 ? (
                filteredFinishedOrders.map((order) => (
                  <tr key={order.order_id} className="order-history-item">
                    <td>#{order.order_id}</td>
                    <td
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => {
                        const actualTableNo =
                          order.table_no ??
                          order.merged_table?.tables?.[0] ??
                          null;
                        fetchAndFilterReport(order.order_id, actualTableNo);
                      }}
                    >
                      {order.table_no}
                    </td>

                    <td>{formatDateTime(order.created_at)}</td>
                    <td
                      className="order-data clickable-items"
                      onClick={(e) => handleItemsClick(order, e)}
                    >
                      {getItemNames(order)}
                    </td>
                    <td className="order-data">₹{order.total?.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-orders">
                    {finishedOrders.length === 0
                      ? "No order history available"
                      : "No orders match your search criteria"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Order Details Modal */}
          {showDetails && selectedOrder && (
            <div className="order-details-modal">
              <div className="modal-content">
                <button
                  className="close-button"
                  onClick={() => setShowDetails(false)}
                >
                  ×
                </button>

                <h2>Order Details</h2>
                <div className="order-meta">
                  <p>
                    <strong>Order ID:</strong> #{selectedOrder.order_id}
                  </p>
                  <p>
                    <strong>Table No:</strong> {selectedOrder.table_no}
                  </p>
                  
                  <p>
                    <strong>Status:</strong> Completed
                  </p>
                </div>
                <h4>Items</h4>
                <div className="order-items-list">
                  {selectedOrder.order_items.flatMap((item) =>
                    item.order_details.map((detail, index) => (
                      <div key={index} className="order-item-detail">
                        <div className="item-name">{detail.dish_name}</div>
                        <div className="item-quantity">x{detail.quantity}</div>
                        <div className="item-price">
                          ₹{(detail.dish_cost * detail.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="order-total">
                  <h5>Total: ₹{selectedOrder.total?.toFixed(2)}</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ITEM NAME</th>
                <th>OLD STOCK</th>
                <th>RESTORED</th>
                <th>CURRENT STOCK</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.length > 0 ? (
                filteredInventory.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.item_name}</td>
                    <td>
                      {entry.old_stock}
                      {entry.unit}
                    </td>
                    <td>
                      {entry.restock_time} ({entry.added_stock}
                      {entry.unit})
                    </td>
                    <td>
                      {entry.current_stock}
                      {entry.unit}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-records">
                    {inventoryData.length === 0
                      ? "No inventory history available"
                      : "No matching inventory found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {showReportModal && (
        <div
          className="report-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        >
          <div
            className="modal-content"
            style={{
              position: "relative",
              margin: "10% auto",
              padding: "20px",
              background: "#fff",
              width: "80%",
              maxWidth: "600px",
              borderRadius: "8px",
            }}
          >
            {/* Close Button in Top Right */}
            <button
              onClick={() => setShowReportModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                fontSize: "24px",
                fontWeight: "bold",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#333",
              }}
            >
              ×
            </button>

            <h2>Order Report</h2>

            {reportLoading ? (
              <p>Loading...</p>
            ) : reportError ? (
              <p style={{ color: "red" }}>{reportError}</p>
            ) : reportData.length > 0 ? (
              reportData.map((report, index) => (
                <div
                  key={index}
                  className="report-block"
                  style={{ marginBottom: "20px" }}
                >
                  <p>
                    <strong>Order ID:</strong> #{report.orderId}
                  </p>
                  <p>
                    <strong>Table No:</strong> {report.tableNumber}
                  </p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {new Date(report.time).toLocaleString()}
                  </p>
                  <p>
                    <strong>Original Total:</strong> ₹{report.originalTotal}
                  </p>
                  <p>
                    <strong>Final Total:</strong> ₹{report.finalTotal}
                  </p>

                  <h4>Edits:</h4>
                  <ul
                    className="report-list"
                    style={{ listStyle: "none", paddingLeft: 0 }}
                  >
                    {report.edits.map((edit, i) => (
                      <li
                        key={i}
                        style={{
                          marginBottom: "10px",
                          background: "#f5f5f5",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        {edit.type === "discount" ? (
                          <>
                            <strong>Discount Applied:</strong>
                            <br />
                            {edit.discountPercent} off — ₹{edit.oldFinalTotal} ➜
                            ₹{edit.newFinalTotal}
                            <br />
                          </>
                        ) : (
                          <>
                            <strong>{edit.itemName}</strong> — {edit.changeType}
                            <br />
                            Qty: {edit.changeQty}, Unit Price: ₹{edit.unitPrice}
                            , Total: ₹{edit.total}
                            <br />
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No report data for this order.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
