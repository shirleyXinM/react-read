import React from 'react';

function EmptyShelf(props){
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div>{props.msg}</div>
    </div>
  )
}

export default EmptyShelf
