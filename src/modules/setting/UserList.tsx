import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 200
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    width: 200
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'string',
    width: 200
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'string',
    width: 400
  },
  
];

const rows = [
  {id: 'obj1', name: 'Jon', email: "heello@world.com" },
  {id: 'obj11', name: 'Cersei', email: "fff@world.com" },
  {id: 'obj111', name: 'Jaime', email: "uuuu@world.com" },
  {id: 'obj1111', name: 'Arya', email: "zzzz@world.com" },
  {id: 'obj1112', name: 'Daenerys', email: "qqqqq@world.com" },
  {id: 'obj1113', name: null, email: "kkkkk@world.com" },
  {id: 'obj1114', name: 'Ferrara', email: "yyyy@world.com" },
  {id: 'obj1115', name: 'Rossini', email: "ppppp@world.com" },
  {id: 'obj1116', name: 'Harvey', email: "rrrr@world.com" },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function UserList() {
  return (
    <>
      
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </>
  );
}
