import { useState, useMemo } from 'react';
import _ from 'lodash';

export const useSortableData = (items, config = { path: '', order: 'asc' }) => {
  const [sortColumn, setSortColumn] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortColumn !== null) {
      sortableItems = _.orderBy(
        sortableItems,
        [sortColumn.path],
        [sortColumn.order]
      );
    }
    return sortableItems;
  }, [items, sortColumn]);

  const handleSort = (path) => {
    let order = 'asc';
    if (sortColumn.path === path && sortColumn.order === 'asc') {
      order = 'desc';
    }
    setSortColumn({ path, order });
  };

  return { items: sortedItems, handleSort, sortColumn };
};
