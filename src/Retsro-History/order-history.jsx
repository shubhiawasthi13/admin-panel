
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./history.css";


const socket = io("http://localhost:3000");

const OrderHistory = () => {
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    socket.on("orderUpdate", (data) => {
      console.log("Order Update Received: ", data);
      const recentFinishedOrders = [...data.finishedOrders]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setFinishedOrders(recentFinishedOrders);
    });

    return () => {
      socket.off("orderUpdate");
    };
  }, []);

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return new Date(dateString + 'Z').toLocaleString();
      }
      return date.toLocaleString();
    } catch {
      return 'Invalid Date/Time';
    }
  };

  const calculateTotal = (order) => {
    return order.order_items
      .flatMap(item => item.order_details)
      .reduce((sum, item) => sum + (item.dish_cost * item.quantity), 0);
  };

  const getItemNames = (order) => {
    const items = order.order_items.flatMap(item => 
      item.order_details.map(detail => detail.dish_name)
    );
    
    if (items.length <= 2) {
      return items.join(', ');
    }
    return `${items.slice(0, 2).join(', ')} + ${items.length - 2} more`;
  };

  const handleItemsClick = (order, e) => {
    e.stopPropagation(); // Prevent event bubbling to the row
    setSelectedOrder(order);
    setShowDetails(true);
  };

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      <div className="order-history-header">
        <div className="header-item">Order ID</div>
        <div className="header-item">Table No</div>
        <div className="header-item">Date & Time</div>
        <div className="header-item">Items</div>
        <div className="header-item">Total</div>
      </div>

      <div className="order-history-list">
        {finishedOrders.length > 0 ? (
          finishedOrders.map((order) => (
            <div 
              key={order.order_id} 
              className="order-history-item"
            >
              <div className="order-data">#{order.order_id}</div>
              <div className="order-data">{order.table_no}</div>
              <div className="order-data">{formatDateTime(order.created_at)}</div>
              <div 
                className="order-data clickable-items" 
                onClick={(e) => handleItemsClick(order, e)}
              >
                {getItemNames(order)}
              </div>
              <div className="order-data">₹{calculateTotal(order).toFixed(2)}</div>
            </div>
          ))
        ) : (
          <div className="no-orders">No completed orders found</div>
        )}
      </div>

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
              <p><strong>Order ID:</strong> #{selectedOrder.order_id}</p>
              <p><strong>Table No:</strong> {selectedOrder.table_no}</p>
              <p><strong>Date & Time:</strong> {formatDateTime(selectedOrder.created_at)}</p>
              <p><strong>Status:</strong> Completed</p>
            </div>

            <div className="order-items-list">
              <h3>Items</h3>
              {selectedOrder.order_items.flatMap(item => 
                item.order_details.map((detail, index) => (
                  <div key={index} className="order-item-detail">
                    <div className="item-name">{detail.dish_name}</div>
                    <div className="item-quantity">x{detail.quantity}</div>
                    <div className="item-price">₹{detail.dish_cost * detail.quantity}</div>
                  </div>
                ))
              )}
            </div>

            <div className="order-total">
              <h3>Total: ₹{calculateTotal(selectedOrder).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
