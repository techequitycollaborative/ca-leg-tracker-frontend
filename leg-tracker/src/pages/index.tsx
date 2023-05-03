import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GridOptions } from '@ag-grid-community/core';
import CustomTooltip from '../components/Tooltip.tsx';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 const [columnDefs] = useState([
    { headerName: 'Bill Number', field: 'bill_number'},
    { field: 'name' },
    { field: 'author' },
    { field: 'status' },
    { field: 'session' },
    { headerName: 'Origin House Name', field: 'origin_house_name' },
    { headerName: 'Committee Name', field: 'committee_name' },
    { headerName: 'Committee Webpage', field: 'committee_webpage' },
    { headerName: 'Committee House', field: 'committee_house' },
    { headerName: 'Full Bill Text', field: 'full_text' },
    { field: 'notes', editable: true },
  ]);

  const gridOptions: GridOptions = {
    tooltipShowDelay: 1000,
    defaultColDef: { tooltipValueGetter: (params) => params.value}
  };

  const [rowData, setData] = useState(null);
  useEffect(() => {
      async function fetchData() {
        const response = await fetch('http://127.0.0.1:5000/legislation-tracker');
        const rowData = await response.json();
        setData(rowData);
      }
      fetchData();
  }, [])
  
  return (
    <div 
      className="ag-theme-alpine"
      style={{ height: '600px' }}
    >
      <AgGridReact
        id="bill_grid"
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        style={{ height: '100%', width: '100%' }}
      ></AgGridReact>
    </div>
  );
};

