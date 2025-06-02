import React, { useState } from 'react';
import axios from "axios";

function AddNewItem() {
  const [itemName, setItemName] = useState('');
  const [threshold, setThreshold] = useState('');
  const [inStock, setInStock] = useState('');
  const [itemUnit, setItemUnit] = useState('gm'); // Default unit
  const [expiryDate, setExpiryDate] = useState('');
  const [category, setCategory] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const reloadPage = () => {
    window.location.reload();
  };

  const clearForm = ()=>{
    setItemName('');
    setThreshold('')
    setInStock('')
    setItemUnit('')
    setExpiryDate('')
    setCategory('')
    setTotalAmount(0)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      itemName,
      threshold,
      inStock,
      itemUnit,
      expiryDate,
      category,
      totalAmount,
    });

    try {
      const result = await axios.post("http://localhost:3000/api/addInventItem", {
        itemName,
        threshold,
        inStock,
        itemUnit,
        expiryDate,
        category,
        totalAmount,
      });
    
      console.log(result.data);
      alert("Item added successfully");
      clearForm();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item");
    }

  };

  return (
    <div className="add-newitem-container">
      <h3>ADD NEW ITEM</h3>
      <form onSubmit={handleSubmit}>

        <div className="input-box">
        <div className="form-group">
          <label htmlFor="itemName">Item Name*</label>
          <br />
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemUnit">Threshold</label>
          <br />
          <input
            type="text"
            id="itemUnit"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
        </div>

        </div>
        
        <div className="input-middle-box">
        <div className="form-group">
          <label htmlFor="inStock">In Stock</label>
          <br />
          <input
            type="number"
            id="inStock"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <br />
        <select
          id="inStockUnit"
          style={{width:"60px", fontSize:"13px"}}
          value={itemUnit}
          onChange={(e) => setItemUnit(e.target.value)}
          
        >
          <option value="gm">gm</option>
          <option value="kg">kg</option>
          <option value="pcs">pcs</option>
          <option value="ltr">ltr</option>
        </select>

        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <br />
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>

        </div>
        
        <div className="input-box">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <br />
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount</label>
          <br />
          <input
            type="number"
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeHolder="Rs."
          />
        </div>
        </div>
      


         <div class="modal-footer">
        <button type="button" style={{backgroundColor:"red", padding:"10px 16px",border:"none"}} data-bs-dismiss="modal">Cancel</button>
        <button type="submit" style={{backgroundColor:"#DEBF00", padding:"10px 16px",border:"none"}}>Add Item</button>
        </div>

      </form>
    </div>
  );
}

export default AddNewItem;