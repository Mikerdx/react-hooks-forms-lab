import React from "react";

function ShoppingList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span> - <span>{item.category}</span>
        </li>
      ))}
    </ul>
  );
}

export default ShoppingList;
