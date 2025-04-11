import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import ShoppingList from "./ShoppingList";

const initialItems = [
  { id: "1", name: "Apples", category: "Produce" },
  { id: "2", name: "Yogurt", category: "Dairy" },
  { id: "3", name: "String Cheese", category: "Dairy" },
  { id: "4", name: "Lettuce", category: "Produce" },
  { id: "5", name: "Swiss Cheese", category: "Dairy" },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");

  function handleItemFormSubmit(newItem) {
    setItems([...items, newItem]);
  }

  const displayedItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter search={search} onSearchChange={setSearch} />
      <ShoppingList items={displayedItems} />
    </div>
  );
}

export default App;
