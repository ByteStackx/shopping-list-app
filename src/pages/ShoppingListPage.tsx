import React, { useEffect, useState } from 'react';
import '../styles/ShoppingListPage.css';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store';
import {
  fetchLists,
  addList,
  updateList,
  deleteList,
} from '../shoppingListSlice';

interface ShoppingListItem {
  id?: number;
  name: string;
  quantity: number;
  notes?: string;
  category: string;
  image?: string;
}

const categories = ['Groceries', 'Electronics', 'Clothing', 'Other'];

const ShoppingListPage: React.FC = () => {
  const items = useAppSelector(state => state.shoppingList.items);
  const loading = useAppSelector(state => state.shoppingList.loading);
  const error = useAppSelector(state => state.shoppingList.error);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<ShoppingListItem>({
    name: '',
    quantity: 1,
    notes: '',
    category: categories[0],
    image: ''
  });
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // Removed unused navigate
  const sort = searchParams.get('sort') || 'name';

  // Fetch items from JSON server
  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  // Add item
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addList(form));
    setForm({ name: '', quantity: 1, notes: '', category: categories[0], image: '' });
  };

  // Edit item
  const handleEdit = (id: number) => {
    const item = items.find(i => i.id === id);
    if (item) setForm(item);
  };

  // Update item
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id) return;
    await dispatch(updateList({ id: form.id, item: form }));
    setForm({ name: '', quantity: 1, notes: '', category: categories[0], image: '' });
  };

  // Delete item
  const handleDelete = async (id: number) => {
    await dispatch(deleteList(id));
  };

  // Search and sort
  const filtered = items
    .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'category') return a.category.localeCompare(b.category);
      if (sort === 'date') return (a.id || 0) - (b.id || 0);
      return 0;
    });

  return (
  <div className="shopping-list-page">
      <h2>Shopping Lists</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={form.id ? handleUpdate : handleAdd}>
        <input type="text" placeholder="Item Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} required min={1} />
        <input type="text" placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="text" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
  <button type="submit">{form.id ? 'Update Item' : 'Add Item'}</button>
      </form>
      <div style={{ margin: '1em 0' }}>
        <input type="text" placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)} />
        <select
          value={sort}
          onChange={e => {
            setSearchParams({ sort: e.target.value });
          }}
        >
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
          <option value="date">Sort by Date Added</option>
        </select>
      </div>
      <ul>
        {filtered.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> (x{item.quantity}) [{item.category}]
            {item.notes && <span> - {item.notes}</span>}
            {item.image && <img src={item.image} alt={item.name} style={{ width: 40, height: 40, objectFit: 'cover', marginLeft: 8 }} />}
            <button onClick={() => handleEdit(item.id!)}>Edit</button>
            <button onClick={() => handleDelete(item.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListPage;
