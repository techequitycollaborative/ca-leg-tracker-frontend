import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GridOptions } from '@ag-grid-community/core';
import MOCK_DATA from '../components/MOCK_DATA.json';
import CustomTooltip from '../components/Tooltip.tsx';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 const [columnDefs] = useState([
    { headerName: 'Bill Number', field: 'bill_num'},
    { field: 'name' },
    { field: 'author' },
    { field: 'notes', editable: true },
  ]);

  const gridOptions: GridOptions = {
    tooltipShowDelay: 1000,
    defaultColDef: { tooltipValueGetter: (params) => params.value}
  };

  const rowData = useMemo(() => MOCK_DATA, []);
  
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

