// API functions for shopping list CRUD operations
export const fetchLists = async () => {
  const res = await fetch('http://localhost:4000/shoppingListItems');
  return res.json();
};

export const addList = async (list: any) => {
  const res = await fetch('http://localhost:4000/shoppingListItems', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(list)
  });
  return res.json();
};

export const updateList = async (id: number, list: any) => {
  const res = await fetch(`http://localhost:4000/shoppingListItems/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(list)
  });
  return res.json();
};

export const deleteList = async (id: number) => {
  await fetch(`http://localhost:4000/shoppingListItems/${id}`, { method: 'DELETE' });
};
