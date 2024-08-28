import React from 'react';
import { Paper, Typography } from '@mui/material';
import DataTable from 'react-data-table-component';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

interface TaxPayerListProps {
  taxPayers: TaxPayer[];
}

const columns = [
  {
    name: 'TID',
    selector: (row: TaxPayer) => row.tid,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: (row: TaxPayer) => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: (row: TaxPayer) => row.lastName,
    sortable: true,
  },
  {
    name: 'Address',
    selector: (row: TaxPayer) => row.address,
    sortable: true,
  },
];

const TaxPayerList: React.FC<TaxPayerListProps> = ({ taxPayers }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        TaxPayer Records
      </Typography>
      <DataTable
        columns={columns}
        data={taxPayers}
        pagination
        responsive
        highlightOnHover
        striped
      />
    </Paper>
  );
};

export default TaxPayerList;
