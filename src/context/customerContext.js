import { createContext, useState, useEffect } from 'react';
import { getCustomers } from '../services/customerService';

const CustomerContext = createContext();

const CustomerContextProvider = ({ children }) => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [page, setPage] = useState({ currentPage: 1, pageSize: 5 });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await getCustomers();
      setAllCustomers(data);
    };
    fetchCustomers();
  }, []);

  const handlePageChange = (page) => {
    setPage((prevPage) => ({ ...prevPage, currentPage: page }));
  };

  const handleSearch = (customer) => {
    setPage({ ...page, currentPage: 1 });
    setSearchQuery(customer);
  };

  return (
    <CustomerContext.Provider
      value={{
        allCustomers,
        page,
        handlePageChange,
        searchQuery,
        handleSearch,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerContextProvider };
