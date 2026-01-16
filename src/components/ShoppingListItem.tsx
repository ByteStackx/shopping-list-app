import type { ShoppingListItem as ShoppingListItemType } from '../types';

interface ShoppingListItemProps {
  item: ShoppingListItemType;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function ShoppingListItem({ item, onEdit, onDelete }: ShoppingListItemProps) {
  return (
    <li className="shopping-list-item">
      <strong>{item.name}</strong> (x{item.quantity}) [{item.category}]
      {item.notes && <span> - {item.notes}</span>}
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          style={{ width: 40, height: 40, objectFit: 'cover', marginLeft: 8 }}
        />
      )}
      <button onClick={() => onEdit(item.id!)}>Edit</button>
      <button onClick={() => onDelete(item.id!)}>Delete</button>
    </li>
  );
}

export default ShoppingListItem;
