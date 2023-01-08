import React, { useContext, useEffect, useState } from 'react';
import SearchBar from './common/searchBar';
import Pagination from './common/pagination';
import CustomersTable from './customersTable';
import { useSortableData } from '../hooks/useSortableData';
import { paginate } from '../utils/paginate';
import { CustomerContext } from '../context/customerContext';
import Dropdown from './common/dropdown';

const Customers = ({ user }) => {
  const {
    allCustomers,
    currentPage,
    pageSize,
    handlePageSize,
    setCurrentPage,
    searchQuery,
    handleSearch,
  } = useContext(CustomerContext);

  // Sort Customers
  const {
    items: sortedCustomers,
    handleSort,
    sortColumn,
  } = useSortableData(allCustomers, { path: 'name', order: 'asc' });

  const [customers, setCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState(sortedCustomers.length);

  // Filter Customers
  useEffect(() => {
    let filteredCustomers = [...sortedCustomers];

    if (searchQuery) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    setCustomers(paginate(filteredCustomers, currentPage, pageSize));
    setCustomerCount(filteredCustomers.length);
  }, [sortedCustomers, currentPage, pageSize, searchQuery]);

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

      <div className="d-flex flex-row justify-content-between align-items-start mb-5">
        <Pagination
          itemsCount={customerCount}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />

        <div className="d-flex align-items-center">
          <div>Page size: </div>
          <Dropdown
            className="form-select form-select-sm ms-2"
            style={{ width: 'max-content' }}
            value={pageSize}
            dropdownItems={[5, 10, 15]}
            onChange={handlePageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Customers;
