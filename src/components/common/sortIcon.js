import React from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const SortIcon = ({ sortOrder }) => {
  return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
};

export default SortIcon;
