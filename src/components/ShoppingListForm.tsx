import React from 'react';
import { ShoppingListItem } from '../types';
interface ShoppingListFormProps {
  form: ShoppingListItem;
  categories: string[];
  isEditing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (patch: Partial<ShoppingListItem>) => void;
}

function ShoppingListForm({ form, categories, isEditing, onSubmit, onChange }: ShoppingListFormProps) {
  return (
    <form onSubmit={onSubmit} className="shopping-list-form">
      <input
        type="text"
        placeholder="Item Name"
        value={form.name}
        onChange={e => onChange({ name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={e => onChange({ quantity: Number(e.target.value) })}
        required
        min={1}
      />
      <input
        type="text"
        placeholder="Notes"
        value={form.notes}
        onChange={e => onChange({ notes: e.target.value })}
      />
      <select
        value={form.category}
        onChange={e => onChange({ category: e.target.value })}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Image URL"
        value={form.image}
        onChange={e => onChange({ image: e.target.value })}
      />
      <button type="submit">{isEditing ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}

export default ShoppingListForm;
