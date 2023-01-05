import React from 'react';
import { Table, TableBody, TableHeader } from './common/table';

const CustomersTable = ({ customers, onSort, sortColumn, user }) => {
  const columns = [
    { label: 'Customer', path: 'name' },
    { label: 'Phone', path: 'phone' },
    { label: 'Email', path: 'email' },
  ];

  return (
    <Table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={customers} />
    </Table>
  );
};

export default CustomersTable;
