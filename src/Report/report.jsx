
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
    quantity: '2',
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
    quantity: '10%',
    remarks: 'Manual discount was applied to bill total',
    originalTotal: 1000,
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
    setIsDownloading(true);
  
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Restaurant Report', 14, 22);
  
      const tableColumn = ['Table No.', 'Time', 'Item Name', 'Quantity', 'Remarks'];
      const tableRows = filteredData.map((entry) => {
        let remarks = entry.remarks || '';
  
        if (
          entry.originalTotal &&
          typeof entry.quantity === 'string' &&
          entry.quantity.includes('%')
        ) {
          const percent = parseFloat(entry.quantity);
          if (!isNaN(percent)) {
            const discountAmount = (percent / 100) * entry.originalTotal;
            const finalTotal = entry.originalTotal - discountAmount;
  
            remarks = `Manual discount applied to bill total.\nOriginal Total: ₹${Math.round(entry.originalTotal)}\nDiscounted Total: ₹${Math.round(finalTotal)}`;
          }
        } else {
          if (entry.changeType && entry.remarks?.toLowerCase().includes('quantity')) {
            remarks += `\nChange: ${entry.changeType === 'increase' ? 'Quantity Increased' : 'Quantity Decreased'}`;
          }
  
          if (entry.price !== undefined) {
            remarks += `\nUnit Price: ₹${entry.price}`;
            if (entry.quantity && !isNaN(entry.quantity)) {
              remarks += `\nTotal: ₹${entry.price * Number(entry.quantity)}`;
            }
          }
  
          if (entry.discount !== undefined && entry.discount > 0) {
            remarks += `\nAfter Discount: ₹${entry.price - entry.discount}`;
          }
  
          if (entry.originalTotal && entry.discountedTotal) {
            remarks += `\nOriginal Total: ₹${entry.originalTotal}\nDiscounted Total: ₹${entry.discountedTotal}`;
          }
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
        useCss: true, // Let autoTable handle wrapping
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        columnStyles: {
          4: { cellWidth: 90 }, // Widen remarks column more
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontSize: 11,
        },
      });
  
      doc.save('report.pdf');
      setIsDownloading(false);
    }, 1000);
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
  {entry.originalTotal && typeof entry.quantity === 'string' && entry.quantity.includes('%') ? (
    <>
      {(() => {
        const percent = parseFloat(entry.quantity);
        if (!isNaN(percent)) {
          const discountAmount = (percent / 100) * entry.originalTotal;
          const finalTotal = entry.originalTotal - discountAmount;

          return (
            <>
              <strong>
                Manual discount of ₹{Math.round(discountAmount)} ({entry.quantity}) was applied to bill total.
              </strong>
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
