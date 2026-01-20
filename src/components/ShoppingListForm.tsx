import React from 'react';
import { ShoppingListItem } from '../types';
import InputField from './InputField.tsx';
import styles from './ShoppingListForm.module.css';

interface ShoppingListFormProps {
  form: ShoppingListItem;
  categories: string[];
  isEditing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (patch: Partial<ShoppingListItem>) => void;
}

function ShoppingListForm({ form, categories, isEditing, onSubmit, onChange }: ShoppingListFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles['shopping-list-form']}>
      <InputField
        type="text"
        placeholder="Item Name"
        value={form.name}
        onChange={e => onChange({ name: e.target.value })}
        required
      />
      <InputField
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={e => onChange({ quantity: Number(e.target.value) })}
        required
        min={1}
      />
      <InputField
        type="text"
        placeholder="Notes"
        value={form.notes || ''}
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
      <InputField
        type="text"
        placeholder="Image URL"
        value={form.image || ''}
        onChange={e => onChange({ image: e.target.value })}
      />
      <button type="submit">{isEditing ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}

export default ShoppingListForm;
