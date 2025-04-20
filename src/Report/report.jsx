
import React, { useState } from 'react';
import './reportpage.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaDownload, FaSearch } from 'react-icons/fa';


const sampleData = [
  {
    tableNo: '14',
    time: 'Apr 17, 2025 - 11:23 AM',
    item: 'Grilled Salmon',
    quantity: '1',
    price: 450,
    discount: 0,
    remarks: 'Item manually added to bill',
  },
  {
    tableNo: '5',
    time: 'Apr 17, 2025 - 10:12 AM',
    item: 'Caesar Salad',
    quantity: '1',
    price: 280,
    discount: 0,
    remarks: 'Item removed from bill',
  },
  {
    tableNo: '2,3,4',
    time: 'Apr 17, 2025 - 08:23 AM',
    item: 'Multiple tables',
    quantity: '1',
    remarks: 'Tables combined as one',
  },
  {
    tableNo: '22',
    time: 'Apr 16, 2025 - 10:23 AM',
    item: 'Chocolate Mousse',
    quantity: '2',
    price: 200,
    discount: 0,
    changeType: 'increase', // or 'decrease'
    remarks: 'Item quantity manually updated',
  }
,  
  {
    tableNo: '8',
    time: 'Apr 17, 2025 - 12:23 AM',
    item: 'Entire Bill',
    quantity: '15%',
    remarks: 'Manual discount was applied to bill total',
    originalTotal: 1200,
    discountedTotal: 1020,
  },
];

const ReportPage = () => {
  const [date, setDate] = useState('');
  const [tableFilter, setTableFilter] = useState('');
  const [isDownloading, setIsDownloading] = useState(false); // Loading state

  const filteredData = sampleData.filter((entry) => {
    // Extract the date part from the string (e.g., "Apr 17, 2025")
    const rawDateStr = entry.time.split(' - ')[0];
  
    // Convert it to a comparable YYYY-MM-DD string manually
    const dateObj = new Date(rawDateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedEntryDate = `${year}-${month}-${day}`;
  
    // Compare it with the selected date
    const matchesDate = date ? formattedEntryDate === date : true;
    const matchesTable = entry.tableNo.includes(tableFilter);
  
    return matchesDate && matchesTable;
  });
  
  

  const downloadReport = () => {
    setIsDownloading(true); // Start loading

    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Restaurant Report', 14, 22);

      const tableColumn = ['Table No.', 'Time', 'Item Name', 'Quantity', 'Remarks'];
      const tableRows = filteredData.map((entry) => {
        let remarks = entry.remarks;
        
        if (entry.changeType && entry.remarks.toLowerCase().includes('quantity')) {
          remarks += ` | Change: ${entry.changeType === 'increase' ? 'Quantity Increased' : 'Quantity Decreased'}`;
        }
      
        if (entry.price !== undefined) {
          remarks += ` | Price: ₹${entry.price}`;
        }
      
        if (entry.discount !== undefined && entry.discount > 0) {
          remarks += ` | After Discount: ₹${entry.price - entry.discount}`;
        }
      
        if (entry.originalTotal && entry.discountedTotal) {
          remarks += ` | Original Total: ₹${entry.originalTotal} | Discounted Total: ₹${entry.discountedTotal}`;
        }
      
        return [
          entry.tableNo,
          entry.time,
          entry.item,
          entry.quantity,
          remarks,
        ];
      });
      
      
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: 'grid',
      });

      doc.save('report.pdf');

      setIsDownloading(false); // Stop loading
    }, 1000); // Simulated delay for UX
  };

  return (
    <>
     <div className="report-container">
      <h2 className="report-title">Report Page</h2>
      <hr />
      <div className="report-filters">
        <div>
        <span>Date Range</span>
        <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="report-date"
  />
  {date && (
    <button
      onClick={() => setDate('')}
      style={{
        marginLeft: '10px',
        padding: '4px 8px',
        fontSize: '12px',
        cursor: 'pointer',
        backgroundColor: '#ccc',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      Clear
    </button>
  )}
  </div>
        <div style={{position:"relative"}}>
        <span>Table Number</span>
        {!tableFilter && (
       <FaSearch style={{position:"absolute", top:"40px" ,left:"10px",color:"grey"}}/>
         )}
        <input
          type="text"
          placeholder="    Search table number"
          value={tableFilter}
          onChange={(e) => setTableFilter(e.target.value)}
          className="report-table-search"
          
        />
        </div>

        <button
          className="report-download-btn"
          onClick={downloadReport}
          disabled={isDownloading}
        >
          <FaDownload style={{ marginRight: '8px' }} />
          {isDownloading ? 'Downloading...' : 'Download Report'}
        </button>
      </div>

      <div className="report-table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>TABLE NO.</th>
              <th>TIME</th>
              <th>ITEM NAME</th>
              <th>QUANTITY</th>
              <th>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, index) => (
              <tr key={index}>
                <td style={{color:"black", fontWeight:"bold"}}>{entry.tableNo}</td>
                <td>{entry.time}</td>
                <td>{entry.item}</td>
                <td>{entry.quantity}</td>
                <td>
  {entry.remarks}
  {entry.changeType && entry.remarks.toLowerCase().includes('quantity') && (
    <>
      <br />
      <strong>Change:</strong>{' '}
      {entry.changeType === 'increase' ? 'Quantity Increased' : 'Quantity Decreased'}
    </>
  )}
  {entry.price !== undefined && (
    <>
      <br />
      <strong>Price:</strong> ₹{entry.price}
    </>
  )}
  {entry.discount !== undefined && entry.discount > 0 && (
    <>
      <br />
      <strong>After Discount:</strong> ₹{entry.price - entry.discount}
    </>
  )}
  {entry.originalTotal && entry.discountedTotal && (
    <>
      <br />
      <strong>Original Total:</strong> ₹{entry.originalTotal}
      <br />
      <strong>Discounted Total:</strong> ₹{entry.discountedTotal}
    </>
  )}
</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>

  );
};

export default ReportPage;
