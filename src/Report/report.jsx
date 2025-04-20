
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
      remarks: 'Item manually added to bill',
    },
    {
      tableNo: '5',
      time: 'Apr 17, 2025 - 10:12 AM',
      item: 'Caesar Salad',
      quantity: '1',
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
      quantity: '1',
      remarks: 'Item quantity manually updated',
    },
    {
      tableNo: '8',
      time: 'Apr 17, 2025 - 12:23 AM',
      item: 'Entire Bill',
      quantity: '15%',
      remarks: 'Manual discount was applied',
    },
  ];
const ReportPage = () => {
  const [date, setDate] = useState('');
  const [tableFilter, setTableFilter] = useState('');
  const [isDownloading, setIsDownloading] = useState(false); // Loading state

  const filteredData = sampleData.filter((entry) => {
    const cleanedTime = entry.time.replace(' - ', ' ');
    const entryDateObj = new Date(cleanedTime);
    const entryDate = !isNaN(entryDateObj) ? entryDateObj.toISOString().split('T')[0] : null;

    const matchesDate = date ? entryDate === date : true;
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
      const tableRows = filteredData.map((entry) => [
        entry.tableNo,
        entry.time,
        entry.item,
        entry.quantity,
        entry.remarks,
      ]);

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
                <td>{entry.remarks}</td>
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
