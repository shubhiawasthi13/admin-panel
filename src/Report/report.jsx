import React, { useState, useEffect } from 'react';
import './reportpage.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaDownload, FaSearch } from 'react-icons/fa';

const ReportPage = () => {
  const [date, setDate] = useState('');
  const [tableFilter, setTableFilter] = useState('');
  const [orderIdFilter, setOrderIdFilter] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const openModal = (report) => {
    setSelectedReport(report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-reports');
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesDate = date
      ? new Date(report.time).toISOString().slice(0, 10) === date
      : true;

    const matchesTable = tableFilter
      ? report.tableNumber.toString().includes(tableFilter)
      : true;

    const matchesOrderId = orderIdFilter
      ? report.orderId.toString().includes(orderIdFilter)
      : true;

    return matchesDate && matchesTable && matchesOrderId;
  });
  const downloadReport = () => {
  setIsDownloading(true);

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Report Page', 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);

  const rows = filteredReports.map((report) => {
    // Combine all edits info into one string, separated by line breaks
    const allEdits = report.edits.length > 0
      ? report.edits
          .map(
            (edit, i) =>
              `Edit ${i + 1}:\nItem: ${edit.itemName}\nChange: ${edit.changeType}\nQty: ${edit.changeQty}\nUnit Price: ₹${edit.unitPrice}\nTotal: ₹${edit.total}`
          )
          .join('\n\n')
      : '';

    return [
      report.orderId,
      report.tableNumber,
      new Date(report.time).toLocaleString(),
      `₹${report.originalTotal}`,
      allEdits,
      `₹${report.finalTotal}`,
    ];
  });

  autoTable(doc, {
    startY: 30,
    head: [['Order ID', 'Table Number', 'Time', 'Original Total', 'Edits', 'Final Total']],
    body: rows,
    styles: { fontSize: 8, cellPadding: 3, overflow: 'linebreak' }, // allow multiline cell content
    headStyles: { fillColor: [22, 160, 133] },
    theme: 'striped',
    columnStyles: {
      4: { cellWidth: 80 }, // widen edits column to fit multiline text better
    },
  });

  doc.save('report.pdf');
  setIsDownloading(false);
};


  return (
    <>
      <div className="report-container">
        <h2 className="report-title">Report Page</h2>
        <hr />
        <div className="report-filters">

          {/* Date Filter */}
          <div>
            <span>Date</span>
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

          {/* Table Number Filter */}
          <div style={{ position: 'relative' }}>
            <span>Table Number</span>
            {!tableFilter && (
              <FaSearch
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '10px',
                  color: 'grey',
                }}
              />
            )}
            <input
              type="text"
              placeholder="    Search table number"
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
              className="report-table-search"
            />
          </div>

          {/* Order ID Filter */}
          <div style={{ position: 'relative' }}>
            <span>Order ID</span>
            {!orderIdFilter && (
              <FaSearch
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '10px',
                  color: 'grey',
                }}
              />
            )}
            <input
              type="text"
              placeholder="    Search order ID"
              value={orderIdFilter}
              onChange={(e) => setOrderIdFilter(e.target.value)}
              className="report-table-search"
            />
          </div>

          <button className="report-download-btn" disabled={isDownloading}>
            <FaDownload style={{ marginRight: '8px' }} onClick={downloadReport} />
            {isDownloading ? 'Downloading...' : 'Download Report'}
          </button>
        </div>

        {/* Table Display */}
        <div className="report-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Table Number</th>
                <th>DateTime</th>
                <th>Original Total</th>
                <th>Edits</th>
                <th>Final Total</th>
              </tr>
            </thead>
            <tbody>
      {filteredReports.length > 0 ? (
        filteredReports.map((report) => (
          <tr key={report.id}>
            <td>{report.orderId}</td>
            <td>{report.tableNumber}</td>
            <td>{new Date(report.time).toLocaleString()}</td>
            <td>{report.originalTotal}</td>
            <td>
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {report.edits.length > 0 && (
                  <>
                    {report.edits[0].type === 'discount' ? (
                      <>
                        <strong>Discount Applied</strong><br />
                        <strong>Old Total:</strong> ₹{report.edits[0].oldFinalTotal} <br />
                         <strong>Discount:</strong> {parseFloat(report.edits[0].discountPercent)}% <br />
                        <strong>New Total:</strong> ₹{report.edits[0].newFinalTotal} <br />
                      </>
                    ) : (
                      <>
                        <strong>Item:</strong> {report.edits[0].itemName} <br />
                        <strong>Change:</strong> {report.edits[0].changeType} <br />
                        <strong>Qty:</strong> {report.edits[0].changeQty} <br />
                        <strong>Unit Price:</strong> ₹{report.edits[0].unitPrice} <br />
                        <strong>Total:</strong> ₹{report.edits[0].total} <br />
                      </>
                    )}
                  </>
                )}
                {report.edits.length > 1 && (
                  <button
                    onClick={() => openModal(report)}
                    style={{
                      border: 'none',
                      textDecoration: 'underline',
                      color: 'blue',
                      background: 'none',
                      cursor: 'pointer',
                      marginTop: '5px',
                    }}
                  >
                    View All ({report.edits.length})
                  </button>
                )}
              </div>
            </td>
            <td>{report.finalTotal}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" style={{ textAlign: 'center' }}>
            No reports found for the selected filters.
          </td>
        </tr>
      )}
    </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedReport && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '60vh',
              overflowY: 'auto',
            }}
          >
            <h5>All Edits for Order #{selectedReport.orderId}</h5>
      <button
        style={{ float: 'right', marginBottom: '10px' }}
        onClick={closeModal}
      >
        Close
      </button>

            
            {selectedReport.edits.map(({ time, ...edit }, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
          {edit.type === 'discount' ? (
            <>
              <strong>Discount Applied</strong><br />
              <strong>Old Total:</strong> ₹{edit.oldFinalTotal} <br />
                 <strong>Discount:</strong> {parseFloat(edit.discountPercent)}%<br />
              <strong>New Total:</strong> ₹{edit.newFinalTotal} <br />
            </>
          ) : (
            <>
              <strong>Item:</strong> {edit.itemName} <br />
              <strong>Change:</strong> {edit.changeType} <br />
              <strong>Qty:</strong> {edit.changeQty} <br />
              <strong>Unit Price:</strong> ₹{edit.unitPrice} <br />
              <strong>Total:</strong> ₹{edit.total} <br />
            </>
          )}
          {index < selectedReport.edits.length - 1 && <hr />}   </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ReportPage;





















// import React, { useState } from 'react';
// import './reportpage.css';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { FaDownload, FaSearch } from 'react-icons/fa';

// const sampleData = [
//   {
//     tableNo: '22',
//     time: 'Apr 16, 2025 - 10:23 AM',
//     item: 'Chocolate Mousse',
//     quantity: '4',
//     originalTotal: 1200,
//     price: 200,
//     discount: 0,
//     changeType: 'increase',
//     remarks: 'Item quantity manually updated',
//   },
//   {
//     tableNo: '14',
//     time: 'Apr 17, 2025 - 11:23 AM',
//     item: 'Grilled Salmon',
//     quantity: '2',
//     originalTotal: 1800,
//     price: 450,
//     discount: 0,
//     remarks: 'Item manually added to bill',
//   },
//   {
//     tableNo: '5',
//     time: 'Apr 17, 2025 - 10:12 AM',
//     item: 'Caesar Salad',
//     quantity: '1',
//     originalTotal: 1500,
//     price: 280,
//     discount: 0,
//     remarks: 'Item removed from bill',
//   },
//   {
//     tableNo: '2,3,4',
//     time: 'Apr 17, 2025 - 08:23 AM',
//     item: 'Multiple tables',
//     quantity: '1',
//     originalTotal: 2000,
//     remarks: 'Tables combined as one',
//   },
 
//   {
//     tableNo: '8',
//     time: 'Apr 17, 2025 - 12:23 AM',
//     item: 'Entire Bill',
//     quantity: '15%',
//     remarks: 'Manual discount was applied to bill total',
//     originalTotal: 1000,
//   },
// ];

// const ReportPage = () => {
//   const [date, setDate] = useState('');
//   const [tableFilter, setTableFilter] = useState('');
//   const [isDownloading, setIsDownloading] = useState(false);

//   const filteredData = sampleData.filter((entry) => {
//     const rawDateStr = entry.time.split(' - ')[0];
//     const dateObj = new Date(rawDateStr);
//     const year = dateObj.getFullYear();
//     const month = String(dateObj.getMonth() + 1).padStart(2, '0');
//     const day = String(dateObj.getDate()).padStart(2, '0');
//     const formattedEntryDate = `${year}-${month}-${day}`;
//     const matchesDate = date ? formattedEntryDate === date : true;
//     const matchesTable = entry.tableNo.includes(tableFilter);
//     return matchesDate && matchesTable;
//   });

//   const downloadReport = () => {
//     setIsDownloading(true);
//     setTimeout(() => {
//       const doc = new jsPDF();
//       doc.setFontSize(18);
//       doc.text('Restaurant Report', 14, 22);
  
//       const tableColumn = ['Table No.', 'Time', 'Item Name', 'Quantity', 'Original Total', 'Remarks'];

//       const tableRows = filteredData.map((entry) => {
//         let remarks = entry.remarks || '';
      
//         if (entry.originalTotal && typeof entry.quantity === 'string' && entry.quantity.includes('%')) {
//           const percent = parseFloat(entry.quantity);
//           if (!isNaN(percent)) {
//             const discountAmount = (percent / 100) * entry.originalTotal;
//             const finalTotal = entry.originalTotal - discountAmount;
//             remarks = `Manual discount was applied to bill total.\nTotal Discount: ₹${Math.round(discountAmount)}\nFinal Total: ₹${Math.round(finalTotal)}`;
//           }
//         } else {
//           if (entry.changeType && entry.remarks?.toLowerCase().includes('quantity')) {
//             remarks += `\nChange: ${entry.changeType === 'increase' ? `Quantity Increased by ${entry.quantity}` : `Quantity Decreased by ${entry.quantity}`}`;
//           }
      
//           if (entry.price !== undefined) {
//             remarks += `\nUnit Price: ₹${Math.round(entry.price)}`;
//             if (entry.quantity && !isNaN(entry.quantity)) {
//               const total = entry.price * Number(entry.quantity);
//               const discounted = entry.discount ? total - entry.discount : total;
      
//               remarks += `\nTotal: ₹${Math.round(total)}`;
      
//               if (entry.discount && entry.discount > 0) {
//                 remarks += `\nAfter Discount: ₹${Math.round(discounted)}`;
//                 remarks += `\nFinal Total: ₹${Math.round(discounted)}`;
//               } else {
//                 const finalTotal =
//                   entry.changeType === 'increase' || entry.remarks?.toLowerCase().includes('added')
//                     ? entry.originalTotal + total
//                     : entry.originalTotal - total;
      
//                 remarks += `\nFinal Total: ₹${Math.round(finalTotal)}`;
//               }
//             }
//           }
//         }
      
//         return [
//           entry.tableNo,
//           entry.time,
//           entry.item,
//           entry.quantity,
//           entry.originalTotal ? `₹${Math.round(entry.originalTotal)}` : '-',
//           remarks,
//         ];
//       });
      
  
//       autoTable(doc, {
//         head: [tableColumn],
//         body: tableRows,
//         startY: 30,
//         theme: 'grid',
//         useCss: true,
//         styles: {
//           fontSize: 10,
//           cellPadding: 3,
//         },
//         columnStyles: {
//           5: { cellWidth: 90 }, // Remarks column
//         },
        
//         headStyles: {
//           fillColor: [41, 128, 185],
//           textColor: 255,
//           fontSize: 11,
//         },
//       });
  
//       doc.save('report.pdf');
//       setIsDownloading(false);
//     }, 1000);
//   };
  



//   return (
//     <>
//       <div className="report-container">
//         <h2 className="report-title">Report Page</h2>
//         <hr />
//         <div className="report-filters">
//           <div>
//             <span>Date Range</span>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="report-date"
//             />
//             {date && (
//               <button
//                 onClick={() => setDate('')}
//                 style={{
//                   marginLeft: '10px',
//                   padding: '4px 8px',
//                   fontSize: '12px',
//                   cursor: 'pointer',
//                   backgroundColor: '#ccc',
//                   border: 'none',
//                   borderRadius: '4px',
//                 }}
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//           <div style={{ position: "relative" }}>
//             <span>Table Number</span>
//             {!tableFilter && (
//               <FaSearch style={{ position: "absolute", top: "40px", left: "10px", color: "grey" }} />
//             )}
//             <input
//               type="text"
//               placeholder="    Search table number"
//               value={tableFilter}
//               onChange={(e) => setTableFilter(e.target.value)}
//               className="report-table-search"
//             />
//           </div>

//           <button
//             className="report-download-btn"
//             onClick={downloadReport}
//             disabled={isDownloading}
//           >
//             <FaDownload style={{ marginRight: '8px' }} />
//             {isDownloading ? 'Downloading...' : 'Download Report'}
//           </button>
//         </div>

//         <div className="report-table-wrapper">
//           <table className="report-table">
//             <thead>
//               <tr>
//                 <th>TABLE NO.</th>
//                 <th>TIME</th>
//                 <th>ORIGINAL TOTAL</th>
//                 <th>ITEM NAME</th>
//                 <th>QUANTITY</th>
//                 <th>REMARKS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((entry, index) => (
//                 <tr key={index}>
//                   <td style={{ color: "black", fontWeight: "bold" }}>{entry.tableNo}</td>
//                   <td>{entry.time}</td>
//                   <td>{entry.originalTotal}</td>
//                   <td>{entry.item}</td>
//                   <td>{entry.quantity}</td>
//                   <td>
//                     {entry.originalTotal && typeof entry.quantity === 'string' && entry.quantity.includes('%') ? (
//                       (() => {
//                         const percent = parseFloat(entry.quantity);
//                         if (!isNaN(percent)) {
//                           const discountAmount = (percent / 100) * entry.originalTotal;
//                           const finalTotal = entry.originalTotal - discountAmount;
//                           return (
//                             <>
//                               <strong> Manual discount of ₹{Math.round(discountAmount)} ({entry.quantity}) was applied to bill total.</strong>
//                               <br />
//                               <strong>Total Discount:</strong> ₹{Math.round(discountAmount)}
//                               <br />
//                               {/* <strong>Discounted Total:</strong> ₹{Math.round(finalTotal)}
//                               <br /> */}
//                               <strong>Final Total:</strong> ₹{Math.round(finalTotal)}
//                             </>
//                           );
//                         } else {
//                           return <>{entry.remarks}</>;
//                         }
//                       })()
//                     ) : (
//                       <>
//                         {entry.remarks}
//                         {entry.changeType && entry.remarks?.toLowerCase().includes('quantity') && (
//                           <>
//                             <br />
//                             <strong>Change:</strong>{' '}
//                             {entry.changeType === 'increase' ? `Quantity Increased by ${entry.quantity}` : `Quantity D ecreased by ${entry.quantity}`}
//                           </>
//                         )}
//                         {entry.price !== undefined && (
//                           <>
//                             <br />
//                             <strong>Unit Price:</strong> ₹{Math.round(entry.price)}
//                             {entry.quantity && !isNaN(entry.quantity) && (
//                               <>
//                                 <br />
//                                 <strong>Total:</strong> ₹{Math.round(entry.price * Number(entry.quantity))}
//                                 {entry.discount !== undefined && entry.discount > 0 ? (
//                                   <>
//                                     <br />
//                                     <strong>After Discount:</strong> ₹{Math.round(entry.price * Number(entry.quantity) - entry.discount)}
//                                     <br />
//                                     <strong>Final Total:</strong> ₹{Math.round(entry.price * Number(entry.quantity) - entry.discount)}
//                                   </>
//                                 ) : (
//                                   <>
//                                     <br />
                                
// {entry.changeType === 'increase' || entry.remarks?.toLowerCase().includes('added') ? (
//   <>
//     <strong>Final Total:</strong> ₹
//     {Math.round(entry.originalTotal + entry.price * Number(entry.quantity))}
//   </>
// ) : (
//   <>
//     <strong>Final Total:</strong> ₹
//     {Math.round(entry.originalTotal - entry.price * Number(entry.quantity))}
//   </>
// )}

//                                   </>
//                                 )}
//                               </>
//                             )}
//                           </>
//                         )}
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReportPage;





















