// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import "./styles.css";
// const socket = io("http://localhost:3000");

// const Orders = () => {
//   const [newOrders, setNewOrders] = useState([]);
//   const [preparingOrders, setPreparingOrders] = useState([]);
//   const [finishedOrders, setFinishedOrders] = useState([]);

//   const reloadPage = () => {
//     window.location.reload();
//   };

//   // Function to handle updating the order status
//   const updateOrderStatus = (orderNo, status, orderId, orderDetails) => {
//     socket.emit("updateOrderStatus", {
//       order_no: orderNo,
//       status,
//       order_id: orderId,
//       order_details: orderDetails,
//     });
//   };

//   // Listen for order updates
//   useEffect(() => {
//     socket.on("orderUpdate", (data) => {
//       setNewOrders(data.newOrders);
//       setPreparingOrders(data.preparingOrders);
//       setFinishedOrders(data.finishedOrders);
//     });

//     return () => {
//       socket.off("orderUpdate");
//     };

//   }, []);

//   return (
//     <div>
//       <br></br>
//       <h1>Order Panel  <button onClick={reloadPage} style={{ padding: '10px 20px', fontSize: '16px' }}>Refresh Page </button></h1>

//       <OrderSection
//         title="New Orders"
//         orders={newOrders}
//         reqStatus={0}
//         onUpdateStatus={updateOrderStatus}
//       />
//       <OrderSection
//         title="Preparing Orders"
//         orders={preparingOrders}
//         reqStatus={1}
//         onUpdateStatus={updateOrderStatus}
//       />
//       <OrderSection
//         title="Finished Orders"
//         orders={finishedOrders}
//         reqStatus={2}
//         onUpdateStatus={updateOrderStatus}
//       />
//     </div>
//   );
// };

// const OrderSection = ({ title, orders, reqStatus, onUpdateStatus }) => {

//   return (
//     <div className={`order-section ${title.replace(" ", "").toLowerCase()}`}>
//       <h2>{title}</h2>
//       <div className="order-container">
//         {orders.map((order) => (
//           <OrderCard
//             key={order.order_id}
//             order={order}
//             reqStatus={reqStatus}
//             onUpdateStatus={onUpdateStatus}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const OrderCard = ({ order, reqStatus, onUpdateStatus }) => {
//   console.log(order);
//   const triggerPrint = (item,order,time) => {
//     // Create a new printable window
//     const printWindow = window.open("", "_blank");
//     const receiptContent = `<div
//           id="receipt"
//           style={{
//             border: "1px solid #ddd",
//             padding: "20px",
//             maxWidth: "400px",
//             margin: "auto",
//           }}
//         >
//           <h2 style={{ textAlign: "center" }}>Restaurant Name</h2>
//           <h3 style={{ textAlign: "center" }}>Order Receipt</h3>
//           <div className="details">
//             <p>
//               <strong>Table No:</strong> ${order.table_no}
//             </p>
//             <p>
//               <strong>Order No:</strong> ${item.order_no}
//             </p>
//             <p>
//               <strong>Order Id:</strong> ${order.order_id}
//             </p>
//           </div>
//           <div className="order-list">
//             <ol>
//               ${item.order_details.map( (item)=>{
//                 return `<li> 
//                   ${ item.dish_name } x ${ item.quantity } 
//                 </li>`;
//               } )}
//             </ol>
//           </div>
//           <div className="time">
//             <p>
//               <strong>Time:</strong> ${time}
//             </p>
//           </div>
//         </div>`;

//     // Add content to the new window
//     printWindow.document.open();
//     printWindow.document.write(`
//       <html>
//       <head>
//         <title>Receipt</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             margin: 20px;
//           }
//           #receipt {
//             border: 1px solid #ddd;
//             padding: 20px;
//             max-width: 400px;
//             margin: auto;
//           }
//           h2, h3, p {
//             margin: 5px 0;
//           }
//           .details {
//             margin-bottom: 10px;
//           }
//           .order-list {
//             margin-bottom: 10px;
//           }
//           .order-list ol {
//             padding-left: 20px;
//           }
//           .order-list li {
//             margin-bottom: 5px;
//           }
//         </style>
//       </head>
//       <body onload="window.print(); window.close();">
//         ${receiptContent}
//       </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   const triggerPrintForCustomer = (item,order,time,date) => {
//     // Create a new printable window
//     const printWindow = window.open("", "_blank");
//     const receiptContent = `<h2>Customer Receipt</h2>
//     <hr>
//     <p class="center">
//         <strong>Four Season</strong><br>
//         Address Line<br>
//         GSTIN: 22AAAAA0000A1Z5<br>
//         FSSAI: 11223344556677
//     </p>
//     <hr>
//     <p>Date/Time: <strong> ${time} , ${date}</strong></p>
//     <p>Order ID: <strong> ${order.order_id} </strong></p>
//     <p>Table No: <strong> ${order.table_no} </strong></p>
//     <hr>
//     <table class="item-table">
//       ${item.order_details.map( (item)=>{
//         return `<tr> 
//           <th> ${ item.dish_name }</th>
//           <th> qty.${ item.quantity } </th>
//           <th> ₹${item.dish_cost*item.quantity} </th>
//         </tr>`;
//       } )}
//     </table>
//     <hr>
//     <div class="total">
//         <span>Subtotal:</span>
//         <span>₹${gettotalcost(item)} </span>
//     </div>
//     <div class="total">
//         <span>Taxes (5%):</span>
//         <span>₹${(gettotalcost(item) * .05)}</span>
//     </div>
//     <div class="total">
//         <strong>Grand Total:</strong>
//         <strong>₹${gettotalcost(item)+ (gettotalcost(item) * .05)}</strong>
//     </div>
//     <hr>
//     <p class="center">Thank you for dining with us!<br>Visit again soon!</p>
//     <p class="center"><strong>Powered by EatPae</strong></p>`;

//     // Add content to the new window
//     printWindow.document.open();
//     printWindow.document.write(`
//       <html>
//       <head>
//         <title>Customer Receipt</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             max-width: 400px;
//             margin: 20px auto;
//             padding: 10px;
//             border: 1px solid #ccc;
//         }
//         h2 {
//             text-align: center;
//             margin-bottom: 10px;
//         }
//         hr {
//             border: none;
//             border-top: 1px dashed #000;
//             margin: 5px 0;
//         }
//         .center {
//             text-align: center;
//         }
//         .item-table {
//             width: 100%;
//             border-collapse: collapse;
//             margin-top: 10px;
//         }
//         .item-table th, .item-table td {
//             text-align: left;
//             padding: 5px 0;
//         }
//         .item-table td:last-child {
//             text-align: right;
//         }
//         .total {
//             display: flex;
//             justify-content: space-between;
//             margin: 5px 0;
//         }
//     </style>
//       </head>
//       <body onload="window.print(); window.close();">
//         ${receiptContent}
//       </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };
  
//   // Filter order items based on the requested status
//   const filteredItems = order.order_items.filter(
//     (item) => item.order_status === reqStatus
//   );

//   if (filteredItems.length === 0) {
//     return null;
//   }
//   // const tellTableNo =  async(order_id)=>{
//   //   const data = await fetch(`http://localhost:3000/api/table/`+order_id);
//   //   const tableNo = await data.json();
//   //   return tableNo.tableName.table_name;
//   // }

//   // let [table,setTable] = useState(0);
//   // tellTableNo(order.order_id).then((tableName) => {
//   //   console.log(tableName);
//   //   setTable(tableName);
//   // });
//   function getTime(){
//     const d = new Date();
//     let hour = d.getHours();
//     let minutes = d.getMinutes();
//     if(hour < 13){ return `${hour}:${minutes} AM` }
//     return `${hour-12}:${minutes} PM`;
//   }
//   function getCurrentDate() {
//     const today = new Date();
//     const day = today.getDate();
//     const month = today.getMonth() + 1; // JavaScript months are 0-indexed
//     const year = today.getFullYear();
  
//     return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
//   }

//   const acceptAction = (item,order) =>{
//     onUpdateStatus(
//       item.order_no,
//       1,
//       order.order_id,
//       item.order_details
//     )
    
//     triggerPrint(item,order,getTime());
//   }
  
//   const confirmAction = (item,order) => {
//     onUpdateStatus(
//       item.order_no,
//       2,
//       order.order_id,
//       item.order_details
//     )
//     triggerPrintForCustomer(item,order,getTime(),getCurrentDate());
//   }

//   const gettotalcost =(item)=>{
//     let cost = 0;
//     item.order_details.map((item)=>{
//       cost+=item.quantity*item.dish_cost})
//       console.log(cost)
//       return cost;
//   }
//   let c = 1;
//   return (
//     <div className="order-card">
//       <p>
//         <strong>Table No:</strong> { order.table_no } 
//       </p>
//       <p>
//         <strong>Order ID:</strong> {order.order_id}
//       </p>
//       <div className="order-items">
//         {filteredItems.map((item) => (
//           <div className="order-item" key={item.order_no}>
//             <p>
//               <strong>Item No:</strong> {item.order_no}
//             </p>
//             <p>
//               <strong>Total amount:</strong>{gettotalcost(item)}
//             </p>
//             <p>
//               <strong>Details:</strong> 
//                 {item.order_details.map( (item)=>{
//                   return <span >&nbsp; {c++}. 
//                     { item.dish_name } x { item.quantity } <br></br>
//                   </span>;
//                 } )}
//             </p>
//             { item.order_status == 0 && <button onClick={ ()=>{ acceptAction(item,order) } } >
//               Accept and print
//             </button> }
//             { item.order_status == 1 && <button onClick={() => { confirmAction(item,order) } } >
//               Order Completed
//             </button>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;












import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./order.css";
import DelIcon from '../assets/delete.png';
import axios  from 'axios';
const socket =  io("http://localhost:3000");
import Select from "react-select";//new changes

const Orders = () => {
  const [newOrders, setNewOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState();
  const [dishes, setDishes] = useState([]); //new changes
  const [selectedDish, setSelectedDish] = useState("");//new changes
  const [quantity, setQuantity] = useState("");//new changes
  const [filter, setFilter] = useState("all"); // 'all', 'new', 'preparing', 'finished'

  const filterOptions = [
    { value: "all", label: "All Status"},
    { value: "new", label: "New Orders" },
    { value: "preparing", label: "Preparing Orders" },
    { value: "finished", label: "Finished Orders" }
  ];

  // Get orders based on filter
  const getFilteredOrders = () => {
    switch(filter) {
      case "new": return newOrders;
      case "preparing": return preparingOrders;
      case "finished": return finishedOrders;
      default: return [
        ...newOrders.map(o => ({ ...o, _status: 0 })),
        ...preparingOrders.map(o => ({ ...o, _status: 1 })),
        ...finishedOrders.map(o => ({ ...o, _status: 2 }))
      ];
    }
  };
  //new changes
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
//new changes
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDish || quantity < 1) {
      alert("Please select a dish and enter a valid quantity.");
      return;
    }
    console.log("Order Added:", { dish: selectedDish.label, quantity });
    alert("item added successfully");
    setSelectedDish("");
    setQuantity("");
  };
  


 
  
 //new changes-- fetch dish name 
  // useEffect(() => {
  //   console.log("Fetching menu...");

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://eatopae-backend-trials.onrender.com/api/menu", {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`API Error: ${response.statusText}`);
  //       }

  //       const data = await response.json();
  //       //console.log("API Data:", data); // Debugging: Log API response

  //       // Extract dish names
  //       let extractedDishes = [];
  //       if (Array.isArray(data)) {
  //         extractedDishes = data.map((dish) => ({ label: dish.dish_name, value: dish.dish_name }));
  //       }

  //       setDishes(extractedDishes);
  //     } catch (error) {
  //       console.error("Error fetching menu:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://eatopae-backend-trials.onrender.com/api/menu");
        const data = await response.json();
  
        // Include ALL necessary dish properties
        setDishes(data.map(dish => ({
          label: dish.dish_name,
          value: dish.dish_id,       // Critical for backend
          price: dish.dish_cost,     // Needed for calculations
          // Add other fields your backend needs
        })));
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchData();
  }, []);

//.......................................




  // Function to handle updating the order status
  const updateOrderStatus = (orderNo, status, orderId, orderDetails) => {
    socket.emit("updateOrderStatus", {
      order_no: orderNo,
      status,
      order_id: orderId,
      order_details: orderDetails,
    });
  };

  useEffect(() => {
    // Connect and listen for updates
    socket.on("orderUpdate", (data) => {
      console.log("Order Update Received: ", data);
      // Ensure you use a new state object
  setNewOrders([...data.newOrders]); // Create a new array
  setPreparingOrders([...data.preparingOrders]);

  // Show only the most recent 5 finished orders
  const recentFinishedOrders = [...data.finishedOrders]
    .sort((a, b) => b.order_id - a.order_id)
    .slice(0, 5);

  setFinishedOrders(recentFinishedOrders);

    });
  
    // Cleanup to prevent memory leaks
    return () => {
      socket.off("orderUpdate");
    };
  }, []);

  let [filteredItems,setFilteredItems] = useState({});
  let [item,setItem] = useState({});
  let [status,setStatus] = useState(false);
  let [orderStatus,setOrderStatus] = useState(0);

  let [editOrderStatus,setEditOrdersSatatus] = useState(false);

  const handleSlectedTable = (item, orderStatus ) =>{

  //   Filter order items based on the requested status
    const tempItems = item.order_items.filter(
      (item) => item.order_status === orderStatus
    );
    setItem(item);
    setFilteredItems( tempItems );
    setStatus(true);
    setOrderStatus(orderStatus);
    setEditOrdersSatatus(false);
  }

  const triggerPrint = (item,orders,time) => {
    // Create a new printable window
    const printWindow = window.open("", "_blank");
    const receiptContent = `<div
          id="receipt"
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            maxWidth: "58mm",
            margin: "auto",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Restaurant Name</h2>
          <h3 style={{ textAlign: "center" }}>Order Receipt</h3>
          <div className="details">
            <p>
              <strong>Table No:</strong> ${item.table_no}
            </p>
            <p>
              <strong>Order No:</strong> ${item.order_no}
            </p>
            <p>
              <strong>Order Id:</strong> ${item.order_id}
            </p>
          </div>
          <div className="order-list">
            <ol>
              ${orders.map( (item)=>{
                return `<li> 
                  ${ item.dish_name } x ${ item.quantity } 
                </li>`;
              } )}
            </ol>
          </div>
          <div className="time">
            <p>
              <strong>Time:</strong> ${time}
            </p>
          </div>
        </div>`;

    // Add content to the new window
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          #receipt {
            border: 1px solid #ddd;
            padding: 20px;
            max-width: 400px;
            margin: auto;
          }
          h2, h3, p {
            margin: 5px 0;
          }
          .details {
            margin-bottom: 10px;
          }
          .order-list {
            margin-bottom: 10px;
          }
          .order-list ol {
            padding-left: 20px;
          }
          .order-list li {
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${receiptContent}
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const triggerPrintForCustomer = (item,orders,time,date) => {
    // Create a new printable window
    const printWindow = window.open("", "_blank");
    const receiptContent = `<h2>Customer Receipt</h2>
    <hr>
    <p class="center">
        <strong>Four Season</strong><br>
        Address Line<br>
        GSTIN: 22AAAAA0000A1Z5<br>
        FSSAI: 11223344556677
    </p>
    <hr>
    <p>Date/Time: <strong> ${time} , ${date}</strong></p>
    <p>Order ID: <strong> ${item.order_id} </strong></p>
    <p>Table No: <strong> ${item.table_no} </strong></p>
    <hr>
    <table class="item-table">
      ${orders.map( (ord)=>{
        return `<tr> 
          <th> ${ ord.dish_name }</th>
          <th> qty.${ ord.quantity } </th>
          <th> ₹${ord.dish_cost*ord.quantity} </th>
        </tr>`;
      } )}
    </table>
    <hr>
    <div class="total">
        <span>Subtotal:</span>
        <span>₹${gettotalcost(item)} </span>
    </div>
    <div class="total">
        <span>Taxes (5%):</span>
        <span>₹${(gettotalcost(item) * .05)}</span>
    </div>
    <div class="total">
        <strong>Grand Total:</strong>
        <strong>₹${gettotalcost(item)+ (gettotalcost(item) * .05)}</strong>
    </div>
    <hr>
    <p class="center">Thank you for dining with us!<br>Visit again soon!</p>
    <p class="center"><strong>Powered by EatPae</strong></p>`;

    // Add content to the new window
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Customer Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 400px;
            margin: 20px auto;
            padding: 10px;
            border: 1px solid #ccc;
        }
        h2 {
            text-align: center;
            margin-bottom: 10px;
        }
        hr {
            border: none;
            border-top: 1px dashed #000;
            margin: 5px 0;
        }
        .center {
            text-align: center;
        }
        .item-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .item-table th, .item-table td {
            text-align: left;
            padding: 5px 0;
        }
        .item-table td:last-child {
            text-align: right;
        }
        .total {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
        }
    </style>
      </head>
      <body onload="window.print(); window.close();">
        ${receiptContent}
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  function getTime(){
    const d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    if(hour < 13){ return `${hour}:${minutes} AM` }
    return `${hour-12}:${minutes} PM`;
  }
  function getCurrentDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // JavaScript months are 0-indexed
    const year = today.getFullYear();
  
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  const handleIncrease = (id) => {
    console.log(id);
    filteredItems[0].order_details = filteredItems[0].order_details.map( (item) => ( 
          item.dish_id === id ? { ...item, quantity: item.quantity + 1 } : item
      ) ) 
    setFilteredItems( [...filteredItems] );
  };

  const handleDecrease = (id) => {
    filteredItems[0].order_details = filteredItems[0].order_details.map( (item) => ( 
          item.dish_id === id ? { ...item, quantity: item.quantity - 1 } : item
      ) ) 
    setFilteredItems( [...filteredItems] );
  };

  const handleDelete = (id) => {
    const userResponse = window.confirm("Are you sure you want to delete this?");
    if (userResponse){
      filteredItems[0].order_details = filteredItems[0].order_details.filter( (item) => item.dish_id != id  ) 
      setFilteredItems( [...filteredItems] );
    }
  };

  const acceptAction = (item) =>{

    filteredItems.map((ord) =>{
      console.log(ord.order_no);
      updateOrderStatus(
        ord.order_no,
        1,
        // order.order_id,
        item.order_id,
        ord.order_details
      )
      console.log(ord.order_details);
    } )
    
    // triggerPrint(item,order_details,getTime());
    setStatus(false);
    setEditOrdersSatatus(false);
  }
  
  const confirmAction = (item) => {

    setEditOrdersSatatus(false);
    
    filteredItems.map((ord) =>{
      console.log(ord.order_no);
      updateOrderStatus(
        ord.order_no,
        2,
        // order.order_id,
        item.order_id,
        ord.order_details
      )
      console.log(ord.order_details);
    } )

    // triggerPrintForCustomer(item,order_details,getTime(),getCurrentDate());
    setStatus(false);
    setEditOrdersSatatus(false);
  }

  let totalBill = 0;
  let totalItem = 0;

  const gettotalcost =(item)=>{
    let cost = 0;
      totalItem += item.quantity;
      cost+=item.quantity*item.dish_cost
    totalBill += cost;  
    return cost;
  }

  const editOrder = async() =>{
    setEditOrdersSatatus(!editOrderStatus);
    
    if(editOrderStatus){
      try {
        const response = await axios.put(
          `http://localhost:3000/api/order-details/${item.order_id}/${item.order_items[0].order_no}`,
          {
            order_details: filteredItems[0].order_details, order_status: filteredItems[0].order_status,
          }
        );
        const responseData = response.data;
        console.log("Order Response:", responseData);
      } catch (error) {
        console.error("Error Editing order:", error);
        alert("Failed to Edit order. Please try again.");
      }
    }

  }

  

  function addItem() {
   setIsAddItemModalOpen(true);
  }




    
    const billPrint = async (item) => {
        setLoading(true);
        setMessage("");
         console.log(item)
        try {
            //  console.log("printed")
            const response = await fetch("http://localhost:3000/api/bill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ order_id: item.order_id }),
            });
          
            const data = await response.json();
        

            if (response.ok) {
              console.log(data);
                setMessage(data.message);
            } else {
                setMessage(data.error || "Failed to print bill");
            }
        } catch (error) {
            setMessage("Error: Unable to connect to the server");
        }

        setLoading(false);
    };

    const orderPrint = async (item) => {
      setLoading(true);
      setMessage("");
       console.log(item)
      try {
          //  console.log("printed")
          const response = await fetch("http://localhost:3000/api/order", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ order_id: item.order_id }),
          });
        
          const data = await response.json();
      

          if (response.ok) {
            console.log(data);
              setMessage(data.message);
          } else {
              setMessage(data.error || "Failed to print order");
          }
      } catch (error) {
          setMessage("Error: Unable to connect to the server");
      }

      setLoading(false);
  };









  return (<>
  <div className="container">
    {/* <div className="mainLeft">
      <br></br><br /><br />
      <h1>
        Order Panel
      </h1>
      <OrderSection
        title="New Orders"
        orders={newOrders}
        reqStatus={0}
        onUpdateStatus={updateOrderStatus}
        handleSlectedTable = {handleSlectedTable}

      />
      <OrderSection
        title="Preparing Orders"
        orders={preparingOrders}
        reqStatus={1}
        onUpdateStatus={updateOrderStatus}
        handleSlectedTable = {handleSlectedTable}
      />
      <OrderSection
        title="Finished Orders"
        orders={finishedOrders}
        reqStatus={2}
        onUpdateStatus={updateOrderStatus}
        handleSlectedTable = {handleSlectedTable}
      />
    </div> */}
{/* new changes */}
<div className="mainLeft">
        <h1>Order Panel</h1>
        <hr />
        
        {/* Filter Dropdown */}
        <div className="order-filter">
          <h3>Table Overview</h3>
          <Select
            options={filterOptions}
            defaultValue={filterOptions[0]}
            onChange={(selected) => setFilter(selected.value)}
            className="filter-select"
          />
        </div>

        {/* Single Dynamic Order Section */}
        <div className="order-section">
          <h2>
            {filter === "all" ? "All Orders" : filterOptions.find(f => f.value === filter).label}
            <span className="order-count"> ({getFilteredOrders().length})</span>
          </h2>
          
          <div className="order-container">
            {getFilteredOrders().map((order) => (
              <OrderCard
                key={`${order._status || order.order_items[0]?.order_status}-${order.order_id}`}
                order={order}
                status={order._status ?? order.order_items[0]?.order_status}
                onUpdateStatus={updateOrderStatus}
                handleSlectedTable={handleSlectedTable}
              />
            ))}
          </div>
        </div>
        </div>

     {/* add item Modal */}
{isAddItemModalOpen && (    
    <div className="order-form-container">
         <button onClick={ ()=>{setIsAddItemModalOpen(false)} } style={{border:"none",color:"grey", fontWeight:"bold"}}>X</button>
       <h2 className="order-form-title">Add Item</h2>
       <form onSubmit={handleSubmit}>
      <Select
        options={dishes}
        value={selectedDish}
        onChange={setSelectedDish}
        placeholder="Item name..."
        isSearchable
      />
      <br />
      {selectedDish && <p>You selected: {selectedDish.label}</p>}
      
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        min={1}
        value={quantity}
        onChange={handleQuantityChange}
        className="order-input"
      />
      <br />
      
      <button type="submit" className="submit-button">
        Add
      </button>
    </form>
    </div>
      )}
    {/* Order Details */}

  { status &&

  <div className="order-details">
    <button className="crossBtn" onClick={ ()=>{setStatus(false); setEditOrdersSatatus(false)} }>X</button>
    {orderStatus == 0 && <h4>New Orders</h4>}
     {orderStatus == 1 && <h4>Preparing Orders</h4>}
     {orderStatus == 2 && <h4>Finished Orders</h4>}

      {/* new changes */}
    { orderStatus == 1  && <button style={{float:"right", backgroundColor:"none", color:"green",border:"none"}} onClick={() => { editOrder() } } > { editOrderStatus ? `Save` : `Edit Order` } </button>}

    {/* new changes */}
    { orderStatus == 1  && <button style={{float:"right", backgroundColor:"none", color:"red",border:"none",marginRight:'15px'}} onClick={() => { addItem() } } >Add Item</button>} 

      <div className="header mt-5">
        <div className="details">
          {/* <p>Maya K.</p> */}
          <p>{getCurrentDate()}, {getTime()}</p>
        </div>
        <div className="table-info">
          <p>Table {item.table_no}</p>
          <p>#{item.order_id}</p>
        </div>
      </div>

      { !editOrderStatus &&
        <div className="order-items">
        {filteredItems.map((item, index) => (
          <div key={index} className="order-item">
            {item.order_details.map((detail, i) => (
              <div key={i} className="item-details">
                <p className="dish-name">{detail.dish_name}</p>
                {detail.notes && <p className="notes">{detail.notes}</p>}
                <p className="quantity-price"> x{detail.quantity} </p>
                <p> ₹{detail.dish_cost} = ₹{gettotalcost(detail)}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      }

      { editOrderStatus && 
        <div className="editOrder order-items">
        {filteredItems.map((item, index) => (
          <div key={index} className="order-item">
            {item.order_details.map((detail, i) => (
              <div key={i} className="item-details">
                <p className="dish-name">{detail.dish_name}</p>
                {detail.notes && <p className="notes">{detail.notes}</p>}
                  <p className="quantity-price">
                  <img src= {DelIcon} className="del" style={{cursor:"pointer"}} onClick={ () => { handleDelete(detail.dish_id) }} />
                  &nbsp;
                  <button style={{cursor:"pointer",fontSize:"50px",background:"none", border:"none",color:"grey"}} onClick={ () => { handleDecrease(detail.dish_id) }} disabled={detail.quantity === 1} > - </button>
                   &nbsp; <span style={{fontSize:"15px"}}>{detail.quantity} </span> 
                  <button style={{cursor:"pointer",background:"none", border:"none",fontSize:"35px",color:"grey",marginLeft:"20px"}} onClick={ () => { handleIncrease(detail.dish_id) }} > + </button> 
                  </p>
                  <p> ₹{detail.dish_cost} = ₹{gettotalcost(detail)}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
        }

      <div className="footer">
        <div className="total">
          <p className="dish-name" >Total</p>
          <p> x{totalItem} </p>
          <p> &nbsp; &nbsp; &nbsp; ₹{totalBill}</p>
        </div>
        <div className="order-btn">
        { orderStatus == 0 && <button className="btn-print" onClick={() => { acceptAction(item),orderPrint(item)}}>
         Accept and Print
        </button>}
        { orderStatus == 1 && !editOrderStatus && <button className="btn-print" onClick={() => { confirmAction(item) } } > Order Completed </button>}
        {/* { orderStatus == 1 && <button className="btn-print" onClick={() => { editOrder() } } > { editOrderStatus ? `Save` : `Edit Order` } </button>} */}
       {/* { orderStatus == 2 && <button className="btn-print" onClick={billPrint}>Print Bill</button>} */}
        { orderStatus == 2 && <button 
                onClick={() =>{billPrint(item)}}
                disabled={loading} 
                className="btn-print"
            >
                {loading ? "Processing..." : "Print Bill"}
            </button>}
            {message && <p>{message}</p>}
        </div>
      </div>
    </div>    
}





</div>
  </>);
};

// const OrderSection = ({ title, orders, reqStatus, onUpdateStatus, handleSlectedTable }) => {
//   return (
//     <>
//     <h2>{title}<span style={{color:"grey"}}>{orders.length}</span></h2>
//     <div className={`order-section ${title.replace(" ", "").toLowerCase()}`}>
//       <div className="order-container">
//         {orders.map((order) => (
//           <OrderCard
//             key={order.order_id}
//             order={order}
//             reqStatus={reqStatus}
//             onUpdateStatus={onUpdateStatus}
//             handleSlectedTable = {handleSlectedTable}
//           />
//         ))}
//       </div>
//     </div>
//     </>
  
//   );
// };

// const OrderCard = ({ order, reqStatus, onUpdateStatus, handleSlectedTable }) => {
//   // console.log(order);
//   // Filter order items based on the requested status
//   const filteredItems = order.order_items.filter(
//     (item) => item.order_status === reqStatus
//   );

//   if (filteredItems.length === 0) {
//     return null;
//   }
  
//   function getTime(){
//     const d = new Date();
//     let hour = d.getHours();
//     let minutes = d.getMinutes();
//     if(hour < 13){ return `${hour}:${minutes} AM` }
//     return `${hour-12}:${minutes} PM`;
//   }
//   function getCurrentDate() {
//     const today = new Date();
//     const day = today.getDate();
//     const month = today.getMonth() + 1; // JavaScript months are 0-indexed
//     const year = today.getFullYear();
  
//     return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
//   }

//   const acceptAction = (item,order) =>{
//     onUpdateStatus(
//       item.order_no,
//       1,
//       order.order_id,
//       item.order_details
//     )
    
//     triggerPrint(item,order,getTime());
//   }
  
//   const confirmAction = (item,order) => {
//     onUpdateStatus(
//       item.order_no,
//       2,
//       order.order_id,
//       item.order_details
//     )
//     triggerPrintForCustomer(item,order,getTime(),getCurrentDate());
//   }

//   const gettotalcost =(item)=>{
//     let cost = 0;
//     item.order_details.map((item)=>{
//       cost+=item.quantity*item.dish_cost})
//       console.log(cost)
//       return cost;
//   }

//   let c = 1;
//   return (
//     <div className="order-card order-column" onClick={()=>(handleSlectedTable(order, reqStatus ))}>
//       <div className="orderBox" >
//         Table no. { order.table_no } 
//       </div>
//       <p>
//         <strong>Order ID:</strong> {order.order_id}
//       </p>
//       {/* <div className="order-items">
//         {filteredItems.map((item) => (
//           <div className="order-item" key={item.order_no}>
//             <p>
//               <strong>Item No:</strong> {item.order_no}
//             </p>
//             <p>
//               <strong>Total amount:</strong>{gettotalcost(item)}
//             </p>
//             <p>
//               <strong>Details:</strong> 
//                 {item.order_details.map( (item)=>{
//                   return <> <br/> {c++}. { item.dish_name } x { item.quantity } </>;
//                 } )}
//             </p>
//             { item.order_status == 0 && <button className="printButton" onClick={ ()=>{ acceptAction(item,order) } } >
//               Prt
//             </button> }
//             { item.order_status == 1 && <button onClick={() => { confirmAction(item,order) } } >
//               Order Completed
//             </button>}
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
// };

//new.................



// const OrderCard = ({ order, reqStatus, statusLabel, statusClass, onUpdateStatus, handleSlectedTable }) => {
//   // ... existing code ...

//   return (
//     <div className={`order-card order-column ${statusClass}`} onClick={() => handleSlectedTable(order, reqStatus)}>
//       <div className="orderBox">
//         Table no. {order.table_no}
//         <span className="status-badge">{statusLabel}</span>
//       </div>
//       <p>
//         <strong>Order ID:</strong> {order.order_id}
//       </p>
//       {/* ... rest of your card content ... */}
//     </div>
//   );
// };
{/* new changes */}
const OrderCard = ({ order, status, onUpdateStatus, handleSlectedTable }) => {
  const statusMap = {
    0: { label: "New", class: "new-order" },
    1: { label: "Preparing", class: "preparing-order" },
    2: { label: "Finished", class: "finished-order" }
  };

  const totalPrice = order.order_items
    .flatMap(item => item.order_details)
    .reduce((sum, item) => sum + (item.dish_cost * item.quantity), 0);

  return (
    <div 
      className={`order-card ${statusMap[status].class}`}
      onClick={() => handleSlectedTable(order, status)}
    >
      <div className="order-header">
        <span className="table-number">Table {order.table_no}</span>
        <span className="status-badge">{statusMap[status].label}</span>
      </div>
      <div className="order-meta">
        <span className="order-id">OrderId: #{order.order_id}</span>
        <br />
        <span className="order-total">₹{totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Orders;
