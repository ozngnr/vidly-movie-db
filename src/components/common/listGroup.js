import React from 'react';

const ListGroup = ({ items, onItemSelect, selectedItem, text, value }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[value]}
          className={
            item[text] === selectedItem
              ? 'list-group-item active'
              : 'list-group-item'
          }
          style={{ cursor: 'pointer' }}
          onClick={() => onItemSelect(item[text])}
        >
          {item[text]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  text: 'name',
  value: '_id',
};

export default ListGroup;
