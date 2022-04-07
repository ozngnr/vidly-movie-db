import React from 'react';
import SortIcon from './sortIcon';
import _ from 'lodash';

export const Table = ({ children, ...restProps }) => {
  return <table {...restProps}>{children}</table>;
};

export const TableHeader = ({ onSort, columns, sortColumn, ...restProps }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, i) => (
          <th onClick={() => onSort(column.path)} key={i}>
            {column.label}
            {sortColumn.path === column.path && (
              <SortIcon sortOrder={sortColumn.order} />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export const TableBody = ({ columns, data }) => {
  const renderCells = (item, column) => {
    if (column.content) {
      return column.content(item);
    }

    return _.get(item, column.path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr>
          {columns.map((column, i) => (
            <td>{renderCells(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
