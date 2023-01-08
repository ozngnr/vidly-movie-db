import { createContext, useState, useEffect } from 'react';
import { getCustomers } from '../services/customerService';

const CustomerContext = createContext();

const CustomerContextProvider = ({ children }) => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await getCustomers();
      setAllCustomers(data);
    };
    fetchCustomers();
  }, []);

  const handlePageSize = (e) => {
    setCurrentPage(1);
    setPageSize(+e.target.value);
  };

  const handleSearch = (customer) => {
    setCurrentPage(1);
    setSearchQuery(customer);
  };

  return (
    <CustomerContext.Provider
      value={{
        allCustomers,
        currentPage,
        setCurrentPage,
        pageSize,
        handlePageSize,
        searchQuery,
        handleSearch,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerContextProvider };
