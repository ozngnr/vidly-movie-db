import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Like = ({ liked, toggleLike }) => {
  return liked ? (
    <FaHeart onClick={toggleLike} style={{ cursor: 'pointer' }} />
  ) : (
    <FaRegHeart onClick={toggleLike} style={{ cursor: 'pointer' }} />
  );
};

export default Like;
