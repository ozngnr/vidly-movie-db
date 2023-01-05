import React, { useContext, useEffect, useState } from 'react';
import SearchBar from './common/searchBar';
import Pagination from './common/pagination';
import CustomersTable from './customersTable';
import { useSortableData } from '../hooks/useSortableData';
import { paginate } from '../utils/paginate';
import { CustomerContext } from '../context/customerContext';

const Customers = ({ user }) => {
  const { allCustomers, page, handlePageChange, searchQuery, handleSearch } =
    useContext(CustomerContext);
  const [customers, setCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState(allCustomers.length);

  const {
    items: sortedCustomers,
    handleSort,
    sortColumn,
  } = useSortableData(allCustomers, { path: 'name', order: 'asc' });

  const { currentPage, pageSize } = page;
  useEffect(() => {
    let customers = [...sortedCustomers];

    if (searchQuery) {
      customers = sortedCustomers.filter((customer) =>
        customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    setCustomers(paginate(customers, currentPage, pageSize));
    setCustomerCount(customers.length);
  }, [sortedCustomers, currentPage, pageSize, searchQuery]);

  console.log(customers);
  return (
    <div className="row">
      <h1>Customers</h1>
      <SearchBar value={searchQuery} onChange={handleSearch} />

      <CustomersTable
        customers={customers}
        onSort={handleSort}
        sortColumn={sortColumn}
        user={user}
      />

      <Pagination
        itemsCount={customerCount}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </div>
  );
};

export default Customers;
